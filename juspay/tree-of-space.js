class TreeOfSpace {
  constructor(name, parent = null) {
    this.name = name;
    this.isLocked = false;
    this.lockedBy = null;
    this.children = [];
    this.parent = parent;
    this.lockedDescendants = new Set();
  }

  lock(uid) {
    if (this.isLocked || this.lockedDescendants.size > 0) {
      return false;
    }
    if (!this._checkAncestors()) return false;
    this._notifyLockAncestors();
    this.isLocked = true;
    this.lockedBy = uid;
    return true;
  }

  _checkAncestors() {
    let current = this.parent;
    while (current) {
      if (current.isLocked) return false;
      current = current.parent;
    }
    return true;
  }

  _notifyLockAncestors() {
    let current = this.parent;
    while (current) {
      current.lockedDescendants.add(this);
      current = current.parent;
    }
  }

  unlock(uid) {
    if (!this.isLocked || this.lockedBy !== uid) return false;
    this.isLocked = false;
    this.lockedBy = null;
    this._notifyUnlockAncestors();
    return true;
  }

  _notifyUnlockAncestors() {
    let current = this.parent;
    while (current) {
      current.lockedDescendants.delete(this);
      current = current.parent;
    }
  }

  upgrade(uid) {
    if (this.isLocked || this.lockedDescendants.size === 0) return false;
    if (!this._checkAncestors()) return false;
    for (const descendant of this.lockedDescendants) {
      if (descendant.lockedBy !== uid) return false;
    }
    this.lockedDescendants.forEach((descendant) => {
      descendant.unlock(uid)
    });
    this.lock(uid);
    return true;
  }
}

function buildTree(nodeNames, m) {
  const root = new TreeOfSpace(nodeNames[0], null);
  const q = [root];
  let idx = 1;
  const nodeMap = {};
  while (q.length > 0) {
    const parent = q.shift();
    nodeMap[parent.name] = parent;
    for (let i = 0; i < m && idx < nodeNames.length; i++) {
      const child = new TreeOfSpace(nodeNames[idx++], parent);
      parent.children.push(child);
      q.push(child);
    }
  }
  return nodeMap;
}

const fs = require('fs');
const data = fs.readFileSync(0, 'utf-8').trim().split('\n');
let idx = 0;
const n = parseInt(data[idx++]);
const m = parseInt(data[idx++]);
const q = parseInt(data[idx++]);
const nodeNames = [];
for (let i = 0; i < n; i++) {
  nodeNames.push(data[idx++]);
}

const nodeMap = buildTree(nodeNames, m);

for (let i = 0; i < q; i++) {
  const [op, name, uid] = data[idx++].split(' ');
  const node = nodeMap[name];
  switch (op) {
    case '1':
      console.log(node.lock(uid));
      break;
    case '2':
      console.log(node.unlock(uid));
      break;
    case '3':
      console.log(node.upgrade(uid));
      break;
  }
}

//-----------------------------Per-Node Locks--------------------------------

class NodeLock {
  constructor() {
    this.locked = false;
    this.waiting = [];
  }

  acquire() {
    while (this.locked) {
      // busy
    }
    this.locked = true;
  }

  release() {
    this.locked = false;
  }
}

class TreeOfSpaceThreadSafe {
  constructor(name, parent = null) {
    this.name = name;
    this.isLocked = false;
    this.lockedBy = null;
    this.children = [];
    this.parent = parent;
    this.lockedDescendants = new Set();
    this.nodeLock = new NodeLock(); // each node has its OWN lock
  }

  lock(uid) {
    this.nodeLock.acquire();
    if (this.isLocked || this.lockedDescendants.size > 0) {
      this.nodeLock.release();
      return false;
    }
    const acquiredLocks = [this];
    let current = this.parent;
    while (current) {
      current.nodeLock.acquire();
      acquiredLocks.push(current);
      if (current.isLocked) {
        for (const node of acquiredLocks) {
          node.nodeLock.release();
        }
        return false;
      }
      current = current.parent;
    }
    this.isLocked = true;
    this.lockedBy = uid;
    current = this.parent;
    while (current) {
      current.lockedDescendants.add(this);
      current = current.parent;
    }
    for (let i = acquiredLocks.length - 1; i >= 0; i--) {
      acquiredLocks[i].nodeLock.release();
    }
    return true;
  }

  unlock(uid) {
    this.nodeLock.acquire();
    if (!this.isLocked || this.lockedBy != uid) {
      this.nodeLock.release();
      return false;
    }
    const acquiredLocks = [this];
    let current = this.parent;
    while (current) {
      current.nodeLock.acquire();
      acquiredLocks.push(current);
      current = current.parent;
    }
    // Write phase
    this.isLocked = false;
    this.lockedBy = null;
    current = this.parent;
    while (current) {
      current.lockedDescendants.delete(this);
      current = current.parent;
    }

    // Release all locks in reverse
    for (let i = acquiredLocks.length - 1; i >= 0; i--) {
      acquiredLocks[i].nodeLock.release();
    }
    return true;
  }

  upgrade(uid) {
    this.nodeLock.acquire();
    if (this.isLocked || this.lockedDescendants.size == 0) {
      this.nodeLock.release();
      return false;
    }
    for (const descendant of this.lockedDescendants) {
      if (descendant.lockedBy != uid) {
        this.nodeLock.release();
        return false
      }
    }

    // Acquire ancestor locks
    const acquiredLocks = [this];
    let current = this.parent;
    while (current) {
      current.nodeLock.acquire();
      acquiredLocks.push(current);
      if (current.isLocked) {
        for (const node of acquiredLocks) {
          node.nodeLock.release();
        }
        return false;
      }
      current = current.parent;
    }

    // Unlock all descendants
    const toUnlock = [...this.lockedDescendants];
    for (const descendant of toUnlock) {
      descendant.isLocked = false;
      descendant.lockedBy = null;
      // remove from all ancestors' lockedDescendants
      let ancestor = descendant.parent;
      while (ancestor) {
        ancestor.lockedDescendants.delete(descendant);
        ancestor = ancestor.parent;
      }
    }

    this.isLocked = true;
    this.lockedBy = uid;
    current = this.parent;
    while (current) {
      current.lockedDescendants.add(this);
      current = current.parent;
    }

    for (let i = acquiredLocks.length - 1; i >= 0; i--) {
      acquiredLocks[i].nodeLock.release();
    }
    return true;
  }
}

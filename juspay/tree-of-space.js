class TreeOfSpace {
  constructor() {
    this.isLocked = false;
    this.lockedBy = null;
    this.children = [];
    this.parent = null;
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

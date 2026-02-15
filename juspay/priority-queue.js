class MinPriorityQueue {
  constructor() {
    this.a = [];
  }

  enqueue(val) {
    this.a.push(val);
    let i = this.a.length - 1;
    while (i > 0) {
      let p = Math.floor((i - 1) / 2);
      if (this.a[p] > val) {
        [this.a[i], this.a[p]] = [this.a[p], this.a[i]];
        i = p;
      }
      else break;
    }
  }

  dequeue() {
    if (this.isEmpty()) return null;
    const res = this.a[0];
    const last = this.a.pop();
    if (!this.isEmpty()) this.a[0] = last;
    let i = 0;
    while (2 * i + 1 < this.a.length) {
      let l = 2 * i + 1, r = 2 * i + 2;
      if (this.a[i] > this.a[l] && this.a[l] < (this.a[r] ?? Infinity)) {
        [this.a[i], this.a[l]] = [this.a[l], this.a[i]];
        i = l;
      }
      else if (this.a[r] && this.a[i] > this.a[r]) {
        [this.a[i], this.a[r]] = [this.a[r], this.a[i]];
        i = r;
      }
      else break;
    }
    return res;
  }

  isEmpty() {
    return this.a.length == 0;
  }
}

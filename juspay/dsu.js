class DSU {
  constructor(size) {
    this.parent = Array.from({ length: size }, (_, i) => i);
  }

  find(x) {
    if (x == this.parent[x]) return x;
    this.parent[x] = this.find(this.parent[x]);
    return this.parent[x];
  }

  union(x, y) {
    const rootX = this.find(x);
    const rootY = this.find(y);
    if (rootX == rootY) return;
    this.parent[rootY] = rootX;
  }

  connected(x, y) {
    return this.find(x) == this.find(y);
  }
}

function solvePuddleProblem(n, drops, queries) {
  const dsu = new DSU(n * n);
  const grid = Array.from({ length: n }, () => Array.from({ length: n }, () => false));
  const dir = [[-1, 0], [0, 1], [1, 0], [0, -1]];

  for (const [r, c] of drops) {
    grid[r][c] = true;
    const x = n * r + c;
    for (const [i, j] of dir) {
      if (r + i == n || c + j == n || r + i < 0 || c + j < 0) continue;
      if (grid[r + i][c + j] == true) {
        const y = n * (r + i) + (c + j);
        dsu.union(x, y);
      }
    }
  }

  return queries.map(([r1, c1, r2, c2]) => dsu.connected(n * r1 + c1, n * r2 + c2));
}

const result = solvePuddleProblem(
  4,
  [[1, 1], [3, 3], [1, 2], [2, 2], [2, 3]],
  [[1, 1, 3, 3], [0, 0, 1, 1]]
);

console.log(result);

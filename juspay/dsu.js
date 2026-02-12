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

//------------------------------------DFS Approach-------------------------------------
function solvePuddleProblemDFS(n, drops, queries) {
  const grid = Array.from({ length: n }, () => Array.from({ length: n }, () => false));
  for (const [r, c] of drops) grid[r][c] = true;
  const res = [];
  for (const [r1, c1, r2, c2] of queries) {
    if (!grid[r1][c1] || !grid[r2][c2]) {
      res.push(false);
      continue;
    }
    const visited = Array.from({ length: n }, () => Array.from({ length: n }, () => false));
    res.push(dfs(r1, c1, r2, c2, n, grid, visited));
  }
  return res;
}

function dfs(r1, c1, r2, c2, n, grid, visited) {
  if (r1 == r2 && c1 == c2) return true;
  if (r1 < 0 || r1 == n || c1 < 0 || c1 == n || visited[r1][c1] || !grid[r1][c1]) return false;
  visited[r1][c1] = true;
  return dfs(r1 - 1, c1, r2, c2, n, grid, visited) || dfs(r1, c1 + 1, r2, c2, n, grid, visited) || dfs(r1 + 1, c1, r2, c2, n, grid, visited) || dfs(r1, c1 - 1, r2, c2, n, grid, visited);
}

const res = solvePuddleProblemDFS(
  4,
  [[1, 1], [3, 3], [1, 2], [2, 2], [2, 3]],
  [[1, 1, 3, 3], [0, 0, 1, 1]]
);

console.log(res);

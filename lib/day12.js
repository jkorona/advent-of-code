import { runner } from './utils.js';

const START = 'start';
const END = 'end';

function isSmall(node) {
  return node.toLowerCase() === node;
}

function task1(graph) {
  const allPaths = [];
  let visited = {};
  let currentPath = [];

  function dfs(node) {
    if (visited[node]) return;
    if (isSmall(node)) visited[node] = true;
    currentPath.push(node);
    if (node === END) {
      allPaths.push([...currentPath]);
      visited[node] = false;
      currentPath.pop();
      return;
    }
    for (const edge of graph[node]) {
      dfs(edge);
    }
    currentPath.pop();
    visited[node] = false;
  }

  dfs(START);

  return allPaths.length;
}

function task2(graph) {
  const allPaths = [];
  let visited = {};
  let currentPath = [];

  function dfs(node) {
    if (
      (isSmall(node) && visited[node] == 2) ||
      (node === START && visited[node] == 1) ||
      (isSmall(node) && visited[node] == 1 && Object.values(visited).some(v => v === 2))
    ) return;

    if (isSmall(node)) visited[node] = (visited[node] ?? 0) + 1;

    currentPath.push(node);
    if (node === END) {
      allPaths.push([...currentPath]);
      visited[node] = Math.max(0, (visited[node] ?? 0) - 1);
      currentPath.pop();
      return;
    }
    for (const edge of graph[node]) {
      dfs(edge);
    }
    currentPath.pop();
    visited[node] = Math.max(0, (visited[node] ?? 0) - 1);
  }

  dfs(START);

  return allPaths.length;
}

export default runner((input) => {
  const lines = input.split(/\r?\n/);
  // small example:
  // const lines = [
  //   'start-A',
  //   'start-b',
  //   'A-c',
  //   'A-b',
  //   'b-d',
  //   'A-end',
  //   'b-end',
  // ];
  // larger example:
  // const lines = [
  //   'dc-end',
  //   'HN-start',
  //   'start-kj',
  //   'dc-start',
  //   'dc-HN',
  //   'LN-dc',
  //   'HN-end',
  //   'kj-sa',
  //   'kj-HN',
  //   'kj-dc',
  // ];
  const graph = lines.reduce((graph, line) => {
    const [leftEnd, rightEnd] = line.split('-');
    graph[leftEnd] = (graph[leftEnd] || []).concat([rightEnd]);
    graph[rightEnd] = (graph[rightEnd] || []).concat([leftEnd]);
    return graph;
  }, {});

  return [task1(graph), task2(graph)];
}, 12);

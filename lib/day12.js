import { runner } from './utils.js';

const START = 'start';
const END = 'end';

function isSmall(node) {
  return node.toLowerCase() === node;
}

function crawl(graph, root) {
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

  dfs(root);

  return allPaths;
}

function task1(graph) {
  const paths = crawl(graph, START);
  return paths.length;
}

export default runner((input) => {
  const lines = input.split(/\r?\n/);

  const graph = lines.reduce((graph, line) => {
    const [leftEnd, rightEnd] = line.split('-');
    graph[leftEnd] = (graph[leftEnd] || []).concat([rightEnd]);
    graph[rightEnd] = (graph[rightEnd] || []).concat([leftEnd]);
    return graph;
  }, {});

  return [task1(graph), 0];
}, 12);

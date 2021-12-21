import { readFileSync } from 'fs';

export function runner(fn, day, sampleData = false) {
  return () => {
    if (!day || typeof day === 'boolean') {
      sampleData = day;
      day = process.argv[2];
    }
    const fileIndex = sampleData ? `${day}_1` : day;
    const input = readFileSync(`./data/day${fileIndex}.txt`, 'utf8');

    const [task1Result, task2Result] = fn(input);

    return `\n\n\t* task 1: ${task1Result}\n\t* task 2: ${task2Result}\n`;
  }
}

class Node {

  constructor(value) {
    this.value = value;
    this._next = null;
  }

  get next() {
    return this._next;
  }

  set next(node) {
    node._next = this._next
    this._next = node;
  }

}
export class PriorityQueue {
  constructor(compareFn) {
    this.size = 0;
    this.head = null;
    this.compareFn = compareFn;
  }

  insert(value) {
    this.size += 1;
    const node = new Node(value);

    if (!this.head) {
      this.head = node;
    } else {
      let prev = null;
      let current = this.head;
      while (current) {
        if (this.compareFn(current.value, node.value) > 0) {
          if (prev) {
            node._next = current;
            prev._next = node;
          } else {
            this.head = node;
            node._next = current
          }
          return;
        }
        prev = current;
        current = current.next;
      }
      prev.next = node;
    }
  }

  min() {
    const value = this.head?.value;
    this.head = this.head.next;
    this.size = this.size - 1;
    return value;
  }

  empty() {
    return this.size === 0;
  }

  print() {
    const arr = [];
    let current = this.head;

    while (current) {
      arr.push(current.value);
      current = current.next;
    }

    console.log(arr);
  }
}

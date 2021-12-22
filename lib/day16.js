import { runner } from './utils.js';

const LITERAL = 4;

function readLiteral(codes) {
  let end = false;
  let literal = '';
  while (!end) {
    const bits = codes.splice(0, 5);
    end = bits.shift() === '0';
    literal += bits.join('');
  }
  return parseInt(literal, 2);
}

function readPacket(bits) {
  const version = parseInt(bits.splice(0, 3).join(''), 2);
  const id = parseInt(bits.splice(0, 3).join(''), 2);
  let value;

  if (id === LITERAL) {
    value = readLiteral(bits)
  } else {
    const lengthType = bits.shift();
    const packets = [];
    if (lengthType === '0') {
      const subPacketsLength = parseInt(bits.splice(0, 15).join(''), 2);
      const subPacket = bits.splice(0, subPacketsLength)

      while (subPacket.length > 0) {
        packets.push(readPacket(subPacket));
      }
    } else {
      const subPacketsNumber = parseInt(bits.splice(0, 11).join(''), 2);
      while (packets.length !== subPacketsNumber) {
        packets.push(readPacket(bits));
      }
    }
    value = packets;
  }
  return { id, version, value };
}

function sumVersions(packet) {
  const { version, value } = packet;

  if (Array.isArray(value)) {
    return value.reduce((sum, subPacket) => sum + sumVersions(subPacket), version);
  }

  return version;
}

function task1(packet) {
  return sumVersions(packet);
}

function calculateValue(packet) {
  const value = Array.isArray(packet.value) ?
    packet.value.map(v => calculateValue(v)) :
    packet.value;

  switch (packet.id) {
    case 0:
      return value.reduce((a, b) => a + b);
    case 1:
      return value.reduce((a, b) => a * b);
    case 2:
      return Math.min(...value);
    case 3:
      return Math.max(...value);
    case 4:
      return value;
    case 5:
      return value[0] > value[1] ? 1 : 0;
    case 6:
      return value[0] < value[1] ? 1 : 0;
    case 7:
      return value[0] === value[1] ? 1 : 0;
  }

  throw new Error(`Invalid id ${packet?.id}. Version: ${packet.version}.`);
  
}

function task2(packet) {
  return calculateValue(packet);
}

export default runner((input) => {
  const codes = input.split('');

  const decoded = codes
    .map((code) => parseInt(code, 16).toString(2).padStart(4, '0'))
    .join('')
    .split('');

  const packet = readPacket(decoded)

  return [task1(packet), task2(packet)];
});

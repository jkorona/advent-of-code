import { runner } from './utils.js';

function hitsX(velocity, xmin, xmax) {
  let speed = velocity;
  let x = 0;

  while (true) {
    if (x >= xmin && x <= xmax) {
      return true;
    } else if (x > xmax || !speed) {
      return false;
    }
    x += speed;
    speed = speed > 0 ? speed - 1 : 0;
  }
}

function hits(vx, vy, xmin, xmax, ymin, ymax) {
  let x = 0, y = 0;
  let xSpeed = vx, ySpeed = vy;

  while (true) {
    if (x >= xmin && x <= xmax && y >= ymin && y <= ymax) {
      return true;
    } else if (x > xmax || y < ymin) {
      return false;
    }

    x += xSpeed;
    y += ySpeed;

    xSpeed = xSpeed > 0 ? xSpeed - 1 : 0;
    ySpeed = ySpeed - 1;
  }
}

function task2(xmin, xmax, ymin, ymax) {
  let counter = 0;
  for (let vx = 1; vx <= xmax; vx++) {
    if (hitsX(vx, xmin, xmax)) {
      for (let vy = ymin; vy <= -ymin; vy++) {
        if (hits(vx, vy, xmin, xmax, ymin, ymax)) {
          counter++;
        }
      }
    }
  }

  return counter;
}

export default runner(() => {
  // const input = 'target area: x=20..30, y=-10..-5';
  const input = 'target area: x=236..262, y=-78..-58';
  const [xmin, xmax, ymin, ymax] = Array.from(input.matchAll(/\-?\d+/g)).map(([v]) => parseInt(v, 10));

  const task1 = (ymin + 1) * ymin / 2;


  return [task1, task2(xmin, xmax, ymin, ymax)];
});

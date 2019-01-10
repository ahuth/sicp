import { cons, car, cdr } from './pair';
import { makePoint, getX, getY } from './point';

export const makeSegment = cons;
export const startPoint = car;
export const endPoint = cdr;

export function midPoint(s) {
  const a = startPoint(s);
  const b = endPoint(s);

  return makePoint(
    average(getX(a), getX(b)),
    average(getY(a), getY(b)),
  );
}

function average(n, m) {
  return (n + m) / 2;
}

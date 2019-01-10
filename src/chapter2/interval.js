import { cons, car, cdr } from './pair';

export const makeInterval = cons;
export const lowerBound = car;
export const upperBound = cdr;

export function intAdd(a, b) {
  return makeInterval(
    lowerBound(a) + lowerBound(b),
    upperBound(a) + upperBound(b),
  );
}

export function intMul(a, b) {
  const p1 = lowerBound(a) * lowerBound(b);
  const p2 = lowerBound(a) * upperBound(b);
  const p3 = upperBound(a) * lowerBound(b);
  const p4 = upperBound(a) * upperBound(b);

  return makeInterval(
    Math.min(p1, p2, p3, p4),
    Math.max(p1, p2, p3, p4),
  );
}

export function intDiv(a, b) {
  return intMul(
    a,
    makeInterval(
      1 / upperBound(b),
      1 / lowerBound(b),
    ),
  );
}

export function intSub(a, b) {
  return makeInterval(
    lowerBound(a) - lowerBound(b),
    upperBound(a) - upperBound(b),
  );
}

export function intWidth(x) {
  return Math.abs(upperBound(x) - lowerBound(x));
}

export function makeIntervalPercent(center, tolerance) {
  return makeInterval(
    center - (center * tolerance),
    center + (center * tolerance),
  );
}

export function intCenter(a) {
  const lower = lowerBound(a);
  const upper = upperBound(a);
  return average(lower, upper);
}

export function intPercent(a) {
  const upper = upperBound(a);
  const center = intCenter(a);
  return (upper - center) / center;
}

function average(n, m) {
  return (n + m) / 2;
}

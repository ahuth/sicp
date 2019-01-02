import { gcd, square } from './chapter1';

export function cons(a, b) {
  return f => f(a, b);
}

export function car(p) {
  return p((a, b) => a);
}

export function cdr(p) {
  return p((a, b) => b);
}

export function makeRat(n, d) {
  const flipSigns = n < 0 || d < 0;
  const greatestCommon = gcd(n, d);

  return cons(
    n / greatestCommon * (flipSigns ? -1 : 1),
    d / greatestCommon * (flipSigns ? -1 : 1),
  );
}

export function printRat(rat) {
  return `${numer(rat)}/${denom(rat)}`;
}

export function addRat(a, b) {
  return makeRat(
    (numer(a) * denom(b)) + (denom(a) * (numer(b))),
    (denom(a) * denom(b)),
  );
}

const numer = car;
const denom = cdr;

export const makePoint = cons;
export const getX = car;
export const getY = cdr;

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

const EMPTY_LIST = Symbol('EmptyList');

export function list(...args) {
  return args.reduceRight((acc, val) => cons(val, acc), EMPTY_LIST);
}

export function nth(l, n) {
  if (n <= 0) { return car(l); }
  return nth(cdr(l), n - 1);
}

export function last(l) {
  const tail = cdr(l);

  if (tail == EMPTY_LIST) { return car(l); }
  return last(tail);
}

export function reverse(l) {
  function iter(acc, a) {
    const head = car(a);
    const tail = cdr(a);

    if (tail === EMPTY_LIST) {
      return cons(head, acc);
    }

    return iter(cons(head, acc), tail);
  }

  return iter(EMPTY_LIST, l);
}

export function toString(l, acc = '(') {
  const head = car(l);
  const tail = cdr(l);

  if (tail === EMPTY_LIST) {
    return acc + head + ')';
  }

  return toString(tail, acc + head + ' ');
}

export function squareList(l) {
  if (l === EMPTY_LIST) {
    return EMPTY_LIST;
  }
  return cons(
    square(car(l)),
    squareList(cdr(l)),
  );
}

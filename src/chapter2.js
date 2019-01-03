import { gcd, square } from './chapter1';

const IS_CONS = Symbol('IsCons');

export function cons(a, b) {
  const val = f => f(a, b);
  val[IS_CONS] = true;
  return val;
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
  if (isEmpty(l)) { return undefined; }
  if (n <= 0) { return car(l); }
  return nth(cdr(l), n - 1);
}

export function last(l) {
  if (isEmpty(l)) { return undefined; }

  const tail = cdr(l);

  if (isEmpty(tail)) { return car(l); }
  return last(tail);
}

export function reverse(l, acc = EMPTY_LIST) {
  if (isEmpty(l)) { return acc; }

  const head = car(l);
  const tail = cdr(l);

  return reverse(tail, cons(head, acc));
}

export function toString(l, acc = '(') {
  if (isEmpty(l)) { return acc + ')'; }
  if (isAtom(l)) { return l; }

  const head = car(l);
  const tail = cdr(l);
  const trailing = isEmpty(tail) ? '' : ' ';

  return toString(tail, acc + toString(head) + trailing);
}

export function squareList(l) {
  return mapCar(l, square);
}

export function mapCar(l, f, acc = EMPTY_LIST) {
  if (isEmpty(l)) { return reverse(acc); }

  return mapCar(
    cdr(l),
    f,
    cons(f(car(l)), acc),
  );
}

export function append(a, b) {
  function iter(acc, x) {
    if (isEmpty(x)) { return acc; }
    return iter(
      cons(car(x), acc),
      cdr(x),
    );
  }

  return iter(b, reverse(a));
}

export function isAtom(x) {
  return !x[IS_CONS];
}

export function isEmpty(x) {
  return x === EMPTY_LIST;
}

export function deepReverse(l, acc = EMPTY_LIST) {
  if (isEmpty(l)) { return acc; }
  if (isAtom(l)) { return l; }

  const head = car(l);
  const tail = cdr(l);

  return deepReverse(tail, cons(deepReverse(head), acc));
}

export function fringe(l) {
  if (isEmpty(l)) { return EMPTY_LIST; }
  if (isAtom(l)) { return list(l); }

  const head = car(l);
  const tail = cdr(l);

  return append(fringe(head), fringe(tail));
}

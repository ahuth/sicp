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

export function cadr(p) {
  return car(cdr(p));
}

export function caddr(p) {
  return car(cdr(cdr(p)));
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

export function isPair(x) {
  return x && x[IS_CONS];
}

export function isAtom(x) {
  return !isPair(x);
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

export function equal(x, y) {
  if (isEmpty(x) || isEmpty(y)) { return isEmpty(x) && isEmpty(y); }
  if (isAtom(x) || isAtom(y)) { return x === y; }

  return equal(car(x), car(y)) && equal(cdr(x), cdr(y));
}

export function derive(exp, withRespectTo) {
  if (isConstant(exp, withRespectTo)) { return 0; }
  if (isVariable(exp, withRespectTo)) { return 1; }
  if (isSum(exp)) {
    // Derivative of a sum is the derivatives of the parts summed together.
    return makeSum(
      derive(addend(exp), withRespectTo),
      derive(augend(exp), withRespectTo),
    );
  }
  if (isProduct(exp)) {
    // Derivative of a product is the sum of the first times the derivative of the second and the
    // second times the derivative of the first.
    return makeSum(
      makeProduct(multiplier(exp), derive(multiplicand(exp), withRespectTo)),
      makeProduct(multiplicand(exp), derive(multiplier(exp), withRespectTo)),
    );
  }
}

export function makeSum(a1, a2) {
  if (isNumber(a1) && isNumber(a2)) { return a1 + a2; }
  if (a1 === 0) { return a2; }
  if (a2 === 0) { return a1; }
  return list('+', a1, a2);
}

export function makeProduct(m1, m2) {
  if (isNumber(m1) && isNumber(m2)) { return m1 * m2; }
  if (m1 === 0 || m2 === 0) { return 0; }
  if (m1 === 1) { return m2; }
  if (m2 === 1) { return m1; }
  return list('*', m1, m2);
}

function isSum(e) {
  return isPair(e) && car(e) === '+';
}

function isProduct(e) {
  return isPair(e) && car(e) === '*';
}

const addend = cadr;
const augend = caddr;
const multiplier = cadr;
const multiplicand = caddr;

function isConstant(exp, withRespectTo) {
  return isAtom(exp) && exp !== withRespectTo;
}

function isVariable(exp, withRespectTo) {
  return isAtom(exp) && exp === withRespectTo;
}

function isNumber(x) {
  return typeof x === 'number';
}

export function isElementOfSet(set, x) {
  if (isEmpty(set)) { return false; }
  if (x === car(set)) { return true; }
  if (x < car(set)) { return false; }
  return isElementOfSet(cdr(set), x);
}

export function adjoinSet(set, x) {
  if (isEmpty(set)) { return list(x); }

  const head = car(set);

  if (x === head) { return set; }
  if (x < head) { return cons(x, set); }

  return cons(
    car(set),
    adjoinSet(cdr(set), x),
  );
}

export function intersectionSet(a, b) {
  if (isEmpty(a) || isEmpty(b)) { return EMPTY_LIST; }

  const headA = car(a);
  const headB = car(b);

  if (headA === headB) {
    return cons(
      headA,
      intersectionSet(cdr(a), cdr(b)),
    );
  }

  if (headA < headB) {
    return intersectionSet(cdr(a), b);
  }

  return intersectionSet(a, cdr(b));
}

export function unionSet(a, b) {
  if (isEmpty(a)) { return b; }
  if (isEmpty(b)) { return a; }

  const headA = car(a);
  const headB = car(b);

  if (headA === headB) {
    return cons(
      headA,
      unionSet(cdr(a), cdr(b)),
    );
  }

  if (headA < headB) {
    return cons(
      headA,
      unionSet(cdr(a), b),
    );
  }

  return cons(
    headB,
    unionSet(a, cdr(b)),
  );
}

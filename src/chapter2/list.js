import { cons, car, cdr, isAtom } from './pair';
import { square } from '../chapter1';

export const EMPTY_LIST = Symbol('EmptyList');

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

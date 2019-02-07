import { cons, car, cdr } from './pair';

export function list(...items) {
  return items.reduceRight((acc, item) => cons(item, acc), null);
}

export function isEmpty(l) {
  return l === null;
}

export function map(l, f) {
  if (isEmpty(l)) { return l; }

  return cons(
    f(car(l)),
    map(cdr(l), f),
  );
}

export function every(l, f) {
  if (isEmpty(l)) { return true; }
  if (!f(car(l))) { return false; }
  return every(cdr(l), f);
}

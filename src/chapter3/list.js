import { cons, car, cdr } from './pair';

export function list(...items) {
  return items.reduceRight((acc, item) => cons(item, acc), null);
}

export function isEmpty(l) {
  return l === null;
}

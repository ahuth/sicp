import { cons, car, cdr } from './pair';
import { isEmpty } from './list';

const consStream = cons;
const getHead = car;
const getTail = cdr;

export function enumerateInterval(low, high) {
  if (low > high) { return null; }

  return consStream(
    low,
    enumerateInterval(low + 1, high),
  );
}

export function appenedStreams(s1, s2) {
  if (isEmpty(s1)) { return s2; }

  return consStream(
    getHead(s1),
    appendStreams(getTail(s1), s2),
  );
}

export function filterStream(s, predicate) {
  if (isEmpty(s)) { return null; }

  const head = getHead(s);
  const tail = getTail(s);

  if (predicate(head)) {
    return consStream(head, filterStream(tail, predicate));
  }

  return filterStream(tail, predicate);
}

export function mapStream(s, f) {
  if (isEmpty(s)) { return null; }

  return consStream(
    f(getHead(s)),
    mapStream(getTail(s), f),
  );
}

export function accumulateStream(s, combiner, initialValue) {
  if (isEmpty(s)) { return initialValue; }

  return combiner(
    getHead(s),
    accumulateStream(getTail(s), combiner, initialValue),
  );
}

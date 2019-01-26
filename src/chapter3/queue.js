import { cons, car, cdr, setCar, setCdr } from './pair';
import { isEmpty, EMPTY_LIST } from '../chapter2/list';

export function makeQueue() {
  return cons(EMPTY_LIST, EMPTY_LIST);
}

export function isEmptyQueue(q) {
  return isEmpty(frontPointer(q));
}

export function front(q) {
  if (isEmptyQueue(q)) {
    throw new Error('Front called with empty queue');
  }
  return car(frontPointer(q));
}

export function insertQueue(q, item) {
  const newPair = cons(item, EMPTY_LIST);

  if (isEmptyQueue(q)) {
    setFrontPointer(q, newPair);
    setRearPointer(q, newPair);
    return q;
  }

  setCdr(rearPointer(q), newPair);
  setRearPointer(q, newPair);
  return q;
}

export function deleteQueue(q) {
  if (isEmptyQueue(q)) {
    throw new Error('Delete called with empty queue');
  }
  setFrontPointer(q, cdr(frontPointer(q)));
  return q;
}

function frontPointer(q) {
  return car(q);
}

function rearPointer(q) {
  return cdr(q);
}

function setFrontPointer(q, item) {
  setCar(q, item);
}

function setRearPointer(q, item) {
  setCdr(q, item);
}

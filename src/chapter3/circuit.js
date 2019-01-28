import { cons, car, cdr, setCar, setCdr } from './pair';
import { list, map } from './list';

export function makeWire() {
  return cons(0, list());
}

export function getSignal(w) {
  return car(w);
}

export function setSignal(w, value) {
  setCar(w, value);
  map(getActions(w), f => f());
}

export function addAction(w, proc) {
  setCdr(w, cons(proc, cdr(w)));
}

function getActions(w) {
  return cdr(w);
}

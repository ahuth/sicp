import { cons, car, cdr, setCar, setCdr } from './pair';
import { list, map } from './list';

export function makeWire(signal = 0) {
  return cons(signal, list());
}

export function getSignal(w) {
  return car(w);
}

export function setSignal(w, value) {
  if (getSignal(w) !== value) {
    setCar(w, value);
    map(getActions(w), f => f());
  }
}

export function addAction(w, proc) {
  setCdr(w, cons(proc, cdr(w)));
}

export function inverter(input, output) {
  return new Promise((resolve) => {
    function invertInput() {
      const newValue = logicalNot(getSignal(input));

      setTimeout(() => {
        setSignal(output, newValue);
        resolve();
      }, 100);
    }

    addAction(input, invertInput);
  });
}

function getActions(w) {
  return cdr(w);
}

function logicalNot(s) {
  switch (s) {
    case 0: return 1;
    case 1: return 0;
    default: throw new Error(`Invalid signal: ${s}`);
  }
}

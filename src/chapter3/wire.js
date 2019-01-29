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

export function andGate(a1, a2, output) {
  return new Promise((resolve) => {
    function andAction() {
      const newValue = logicalAnd(getSignal(a1), getSignal(a2));

      setTimeout(() => {
        setSignal(output, newValue);
        resolve();
      }, 100);
    }

    addAction(a1, andAction);
    addAction(a2, andAction);
  });
}

export function orGate(a1, a2, output) {
  return new Promise((resolve) => {
    function orAction() {
      const newValue = logicalOr(getSignal(a1), getSignal(a2));

      setTimeout(() => {
        setSignal(output, newValue);
        resolve();
      }, 100);
    }

    addAction(a1, orAction);
    addAction(a2, orAction);
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

function logicalAnd(s1, s2) {
  if (s1 === 1 && s2 === 1) {
    return 1;
  } else {
    return 0;
  }
}

function logicalOr(s1, s2) {
  if (s1 === 1 || s2 === 1) {
    return 1;
  } else {
    return 0;
  }
}

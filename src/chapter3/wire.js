import { cons, car, cdr, setCar, setCdr } from './pair';
import { list, map } from './list';

export function makeWire(signal = 0) {
  let actions = list();

  function setMySignal(value) {
    if (signal !== value) {
      signal = value;
      map(actions, f => f());
    }
  }

  function acceptAction(proc) {
    actions = cons(proc, actions);
    proc();
  }

  return function (message) {
    switch (message) {
      case 'getSignal': return signal;
      case 'setSignal': return setMySignal;
      case 'addAction': return acceptAction;
      default: throw new Error(`Unknown wire operation: ${message}`);
    }
  }
}

export function getSignal(w) {
  return w('getSignal');
}

export function setSignal(w, value) {
  return w('setSignal')(value);
}

export function addAction(w, proc) {
  return w('addAction')(proc);
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

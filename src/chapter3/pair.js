const IS_CONS = Symbol('IsCons');

export function cons(a, b) {
  function dispatch(message, x) {
    switch (message) {
      case 'car': return a;
      case 'cdr': return b;
      case 'setCar': a = x; break;
      case 'setCdr': b = x; break;
    }
  }

  dispatch[IS_CONS] = true;
  return dispatch;
}

export function car(p) {
  return p('car');
}

export function cdr(p) {
  return p('cdr');
}

export function setCar(p, a) {
  p('setCar', a);
}

export function setCdr(p, b) {
  p('setCdr', b);
}

export function isAtom(p) {
  return !isPair(p);
}

export function isPair(p) {
  return p && p[IS_CONS];
}

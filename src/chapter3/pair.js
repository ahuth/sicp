const IS_CONS = Symbol('IsCons');

export function cons(a, b) {
  function dispatch(message) {
    switch (message) {
      case 'car': return a;
      case 'cdr': return b;
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

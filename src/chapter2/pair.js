const IS_CONS = Symbol('IsCons');

export function isPair(x) {
  return x && x[IS_CONS];
}

export function isAtom(x) {
  return !isPair(x);
}

export function cons(a, b) {
  const val = f => f(a, b);
  val[IS_CONS] = true;
  return val;
}

export function car(p) {
  return p((a, b) => a);
}

export function cdr(p) {
  return p((a, b) => b);
}

export function cadr(p) {
  return car(cdr(p));
}

export function caddr(p) {
  return car(cdr(cdr(p)));
}

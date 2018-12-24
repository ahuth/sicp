export function cons(a, b) {
  return f => f(a, b);
}

export function car(p) {
  return p((a, b) => a);
}

export function cdr(p) {
  return p((a, b) => b);
}

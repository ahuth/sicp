import { gcd } from './chapter1';

export function cons(a, b) {
  return f => f(a, b);
}

export function car(p) {
  return p((a, b) => a);
}

export function cdr(p) {
  return p((a, b) => b);
}

export function makeRat(n, d) {
  const flipSigns = n < 0 || d < 0;
  const greatestCommon = gcd(n, d);

  return cons(
    n / greatestCommon * (flipSigns ? -1 : 1),
    d / greatestCommon * (flipSigns ? -1 : 1),
  );
}

export function printRat(rat) {
  return `${car(rat)}/${cdr(rat)}`;
}

export function addRat(a, b) {
  return makeRat(
    (numer(a) * denom(b)) + (denom(a) * (numer(b))),
    (denom(a) * denom(b)),
  );
}

const numer = car;
const denom = cdr;

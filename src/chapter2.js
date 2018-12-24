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

export function makeRat(numerator, denominator) {
  const isNegative = numerator < 0 || denominator < 0 && !(numerator < 0 && denominator < 0);
  const absNumer = Math.abs(numerator);
  const absDenom = Math.abs(denominator);
  const greatestCommon = gcd(absNumer, absDenom);

  return cons(
    absNumer / greatestCommon * (isNegative ? -1 : 1),
    absDenom / greatestCommon,
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

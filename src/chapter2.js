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
  const greatestCommonDenom = gcd(numerator, denominator);
  return cons(numerator / greatestCommonDenom, denominator / greatestCommonDenom);
}

export function printRat(rat) {
  return `${car(rat)}/${cdr(rat)}`;
}

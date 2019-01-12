import { cons, car, cdr } from './pair';
import { gcd } from '../chapter1';

export function makeRat(n, d) {
  const flipSigns = n < 0 || d < 0;
  const greatestCommon = gcd(n, d);

  return cons(
    n / greatestCommon * (flipSigns ? -1 : 1),
    d / greatestCommon * (flipSigns ? -1 : 1),
  );
}

export function printRat(rat) {
  return `${numer(rat)}/${denom(rat)}`;
}

export function addRat(a, b) {
  return makeRat(
    (numer(a) * denom(b)) + (denom(a) * (numer(b))),
    (denom(a) * denom(b)),
  );
}

export function subRat(a, b) {
  return makeRat(
    (numer(a) * denom(b)) - (denom(a) * (numer(b))),
    (denom(a) * denom(b)),
  );
}

export function mulRat(a, b) {
  return makeRat(
    numer(a) * numer(b),
    denom(a) * denom(b),
  );
}

export function divRat(a, b) {
  return makeRat(
    numer(a) * denom(b),
    denom(a) * numer(b),
  );
}

const numer = car;
const denom = cdr;

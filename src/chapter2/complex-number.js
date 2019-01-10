import { cons, car, cdr } from './pair';
import { square, sqrt } from '../chapter1';

export function makeRectangular(r, i) {
  return cons(
    sqrt(square(r) + square(i)),
    Math.atan2(i, r),
  );
}

export function makePolar(r, a) {
  return cons(r, a);
}

export function realPart(z) {
  return magnitude(z) * Math.cos(angle(z));
}

export function imagPart(z) {
  return magnitude(z) * Math.sin(angle(z));
}

export function magnitude(z) {
  return car(z);
}

export function angle(z) {
  return cdr(z);
}

export function complexAdd(x, y) {
  return makeRectangular(
    realPart(x) + realPart(y),
    imagPart(x) + imagPart(y),
  );
}

export function complexSub(x, y) {
  return makeRectangular(
    realPart(x) - realPart(y),
    imagPart(x) - imagPart(y),
  );
}

export function complexMul(x, y) {
  return makePolar(
    magnitude(x) * magnitude(y),
    angle(x) + angle(y),
  );
}

export function complexDiv(x, y) {
  return makePolar(
    magnitude(x) / magnitude(y),
    angle(x) - angle(y),
  );
}

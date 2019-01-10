import { cons, car, cdr } from './pair';
import { square, sqrt } from '../chapter1';

export function makeRectangular(r, i) {
  return cons(r, i);
}

export function makePolar(r, a) {
  return cons(
    r * Math.cos(a),
    r * Math.sin(a),
  );
}

export function realPart(z) {
  return car(z);
}

export function imagPart(z) {
  return cdr(z);
}

export function magnitude(z) {
  return sqrt(square(realPart(z)) + square(imagPart(z)));
}

export function angle(z) {
  return Math.atan2(imagPart(z), realPart(z));
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

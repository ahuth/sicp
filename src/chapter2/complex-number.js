import { cons, car, cdr } from './pair';
import { operate, put, attachType } from './data-directed-utils';
import { square, sqrt } from '../chapter1';

export function makeRectangular(r, i) {
  return attachType('rectangular', cons(r, i));
}

export function makePolar(r, a) {
  return attachType('polar', cons(r, a));
}

export function realPart(z) {
  return operate('realPart', z);
}

export function imagPart(z) {
  return operate('imagPart', z);
}

export function magnitude(z) {
  return operate('magnitude', z);
}

export function angle(z) {
  return operate('angle', z);
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

export function complexEqu(x, y) {
  return realPart(x) === realPart(y) && imagPart(x) === imagPart(y);
}

export function complexZero(z) {
  return realPart(z) === 0 && imagPart(z) === 0;
}

put('rectangular', 'realPart', realPartRectangular);
put('rectangular', 'imagPart', imagPartRectangular);
put('rectangular', 'magnitude', magnitudeRectangular);
put('rectangular', 'angle', angleRectangular);

put('polar', 'realPart', realPartPolar);
put('polar', 'imagPart', imagPartPolar);
put('polar', 'magnitude', magnitudePolar);
put('polar', 'angle', anglePolar);

function realPartRectangular(z) {
  return car(z);
}

function imagPartRectangular(z) {
  return cdr(z);
}

function magnitudeRectangular(z) {
  return sqrt(square(realPartRectangular(z)) + square(imagPartRectangular(z)));
}

function angleRectangular(z) {
  return Math.atan2(imagPartRectangular(z), realPartRectangular(z));
}

function magnitudePolar(z) {
  return car(z);
}

function anglePolar(z) {
  return cdr(z);
}

function realPartPolar(z) {
  return magnitudePolar(z) * Math.cos(anglePolar(z));
}

function imagPartPolar(z) {
  return magnitudePolar(z) * Math.sin(anglePolar(z));
}

import { cons, car, cdr, isAtom } from './pair';
import { square, sqrt } from '../chapter1';

export function makeRectangular(r, i) {
  return attachType('rectangular', cons(r, i));
}

export function makePolar(r, a) {
  return attachType('polar', cons(r, a));
}

export function realPart(z) {
  if (isRectangular(z)) {
    return realPartRectangular(contents(z));
  }
  if (isPolar(z)) {
    return realPartPolar(contents(z));
  }
}

export function imagPart(z) {
  if (isRectangular(z)) {
    return imagPartRectangular(contents(z));
  }
  if (isPolar(z)) {
    return imagPartPolar(contents(z));
  }
}

export function magnitude(z) {
  if (isRectangular(z)) {
    return magnitudeRectangular(contents(z));
  }
  if (isPolar(z)) {
    return magnitudePolar(contents(z));
  }
}

export function angle(z) {
  if (isRectangular(z)) {
    return angleRectangular(contents(z));
  }
  if (isPolar(z)) {
    return anglePolar(contents(z));
  }
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

function attachType(type, contents) {
  return cons(type, contents);
}

function type(datum) {
  if (isAtom(datum)) {
    throw new Error(`Bad typed datum -- TYPE: ${datum}`);
  }
  return car(datum);
}

function contents(datum) {
  if (isAtom(datum)) {
    throw new Error(`Bad typed datum -- CONTENTS: ${datum}`);
  }
  return cdr(datum);
}

function isRectangular(z) {
  return type(z) === 'rectangular';
}

function isPolar(z) {
  return type(z) === 'polar';
}

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

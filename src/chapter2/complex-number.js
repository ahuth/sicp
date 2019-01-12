import { cons, car, cdr, isAtom } from './pair';
import { square, sqrt } from '../chapter1';

export function makeRectangular(r, i) {
  return attachType('rectangular', cons(r, i));
}

export function makePolar(r, a) {
  return attachType('polar', cons(r, a));
}

const opTable = {};

function put(name, op, item) {
  opTable[name] = opTable[name] || {};
  opTable[name][op] = item;
}

function get(name, op) {
  return opTable[name] && opTable[name][op];
}

function operate(op, obj) {
  const proc = get(type(obj), op);
  if (proc) {
    return proc(contents(obj));
  } else {
    throw new Error(`Operator undefined for this type -- OPERATE ${toString(list(op, obj))}`);
  }
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

export function attachType(type, contents) {
  if (type === 'number') {
    return contents;
  }
  return cons(type, contents);
}

export function type(datum) {
  if (isAtom(datum)) {
    return typeof datum;
  }
  return car(datum);
}

export function contents(datum) {
  if (isAtom(datum)) {
    return datum;
  }
  return cdr(datum);
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

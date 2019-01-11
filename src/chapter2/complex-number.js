import { cons, car, cdr, isAtom } from './pair';
import { square, sqrt } from '../chapter1';

export function makeRectangular(r, i) {
  function dispatch(message) {
    switch (message) {
      case 'realPart':
        return r;
      case 'imagPart':
        return i;
      case 'magnitude':
        return sqrt(square(r) + square(i));
      case 'angle':
        return Math.atan2(i, r);
      default:
        throw new Error(`Unknown op: ${message}`);
    }
  }

  return dispatch;
}

export function makePolar(r, a) {
  function dispatch(message) {
    switch (message) {
      case 'realPart':
        return r * Math.cos(a);
      case 'imagPart':
        return r * Math.sin(a);
      case 'magnitude':
        return r;
      case 'angle':
        return a;
      default:
        throw new Error(`Unknown op: ${message}`);
    }
  }

  return dispatch;
}

function operate(op, obj) {
  return obj(op);
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

import {
  complexAdd,
  complexSub,
  complexMul,
  complexDiv,
  complexEqu,
  complexZero,
  makeRectangular,
} from './complex-number';

import { addRat, subRat, mulRat, divRat, equRat, zeroRat, makeRat, numer, denom } from './rational-number';
import { attachType, operate2, put, operate } from './data-directed-utils';

// Generic operations

export function add(x, y) {
  return operate2('add', x, y);
}

export function sub(x, y) {
  return operate2('sub', x, y);
}

export function mul(x, y) {
  return operate2('mul', x, y);
}

export function div(x, y) {
  return operate2('div', x, y);
}

export function equ(x, y) {
  return operate2('equ', x, y);
}

export function zero(z) {
  return operate('zero', z);
}

export function raise(z) {
  return operate('raise', z);
}

// Integer numbers

function addNumber(x, y) {
  return tagNumber(x + y);
}

function subNumber(x, y) {
  return tagNumber(x - y);
}

function mulNumber(x, y) {
  return tagNumber(x * y);
}

function divNumber(x, y) {
  return tagNumber(x / y);
}

function equNumber(x, y) {
  return x === y;
}

function zeroNumber(z) {
  return z === 0;
}

function raiseNumber(z) {
  return tagRational(makeRat(z, 1));
}

export function tagNumber(n) {
  return n;
}

put('number', 'add', addNumber);
put('number', 'sub', subNumber);
put('number', 'mul', mulNumber);
put('number', 'div', divNumber);
put('number', 'equ', equNumber);
put('number', 'zero', zeroNumber);
put('number', 'raise', raiseNumber);

// Complex numbers

function addComplex(x, y) {
  return tagComplex(complexAdd(x, y));
}

function subComplex(x, y) {
  return tagComplex(complexSub(x, y));
}

function mulComplex(x, y) {
  return tagComplex(complexMul(x, y));
}

function divComplex(x, y) {
  return tagComplex(complexDiv(x, y));
}

function equComplex(x, y) {
  return complexEqu(x, y);
}

function zeroComplex(z) {
  return complexZero(z);
}

export function tagComplex(n) {
  return attachType('complex', n);
}

put('complex', 'add', addComplex);
put('complex', 'sub', subComplex);
put('complex', 'mul', mulComplex);
put('complex', 'div', divComplex);
put('complex', 'equ', equComplex);
put('complex', 'zero', zeroComplex);

// Rational numbers

function addRational(x, y) {
  return tagRational(addRat(x, y));
}

function subRational(x, y) {
  return tagRational(subRat(x, y));
}

function mulRational(x, y) {
  return tagRational(mulRat(x, y));
}

function divRational(x, y) {
  return tagRational(divRat(x, y));
}

function equRational(x, y) {
  return equRat(x, y);
}

function zeroRational(z) {
  return zeroRat(z);
}

function raiseRational(z) {
  return tagComplex(makeRectangular(numer(z) / denom(z), 0));
}

export function tagRational(n) {
  return attachType('rational', n);
}

put('rational', 'add', addRational);
put('rational', 'sub', subRational);
put('rational', 'mul', mulRational);
put('rational', 'div', divRational);
put('rational', 'equ', equRational);
put('rational', 'zero', zeroRational);
put('rational', 'raise', raiseRational);

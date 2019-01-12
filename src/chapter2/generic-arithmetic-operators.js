import {
  attachType,
  type,
  contents,
  complexAdd,
  complexSub,
  complexMul,
  complexDiv,
  complexEqu,
} from './complex-number';

import { addRat, subRat, mulRat, divRat, equRat } from './rational-number';

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

const opTable = {};

function put(name, op, item) {
  opTable[name] = opTable[name] || {};
  opTable[name][op] = item;
}

function get(name, op) {
  return opTable[name] && opTable[name][op];
}

function operate2(op, arg1, arg2) {
  const t1 = type(arg1);
  const t2 = type(arg2);

  if (t1 !== t2) {
    throw new Error('Operands not of same type');
  }

  const proc = get(t1, op);

  if (!proc) {
    throw new Error('Operator not defined for type');
  }

  return proc(contents(arg1), contents(arg2));
}

function addNumber(x, y) {
  return makeNumber(x + y);
}

function subNumber(x, y) {
  return makeNumber(x - y);
}

function mulNumber(x, y) {
  return makeNumber(x * y);
}

function divNumber(x, y) {
  return makeNumber(x / y);
}

function equNumber(x, y) {
  return x === y;
}

export function makeNumber(n) {
  return attachType('number', n);
}

put('number', 'add', addNumber);
put('number', 'sub', subNumber);
put('number', 'mul', mulNumber);
put('number', 'div', divNumber);
put('number', 'equ', equNumber);

function addComplex(x, y) {
  return makeComplex(complexAdd(x, y));
}

function subComplex(x, y) {
  return makeComplex(complexSub(x, y));
}

function mulComplex(x, y) {
  return makeComplex(complexMul(x, y));
}

function divComplex(x, y) {
  return makeComplex(complexDiv(x, y));
}

function equComplex(x, y) {
  return complexEqu(x, y);
}

export function makeComplex(n) {
  return attachType('complex', n);
}

put('complex', 'add', addComplex);
put('complex', 'sub', subComplex);
put('complex', 'mul', mulComplex);
put('complex', 'div', divComplex);
put('complex', 'equ', equComplex);

function addRational(x, y) {
  return makeRational(addRat(x, y));
}

function subRational(x, y) {
  return makeRational(subRat(x, y));
}

function mulRational(x, y) {
  return makeRational(mulRat(x, y));
}

function divRational(x, y) {
  return makeRational(divRat(x, y));
}

function equRational(x, y) {
  return equRat(x, y);
}

export function makeRational(n) {
  return attachType('rational', n);
}

put('rational', 'add', addRational);
put('rational', 'sub', subRational);
put('rational', 'mul', mulRational);
put('rational', 'div', divRational);
put('rational', 'equ', equRational);

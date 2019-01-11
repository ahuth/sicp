import {
  attachType,
  type,
  contents,
  makeRectangular,
  makePolar,
  complexAdd,
  complexSub,
  complexMul,
  complexDiv,
} from './complex-number';

export function add(x, y) {
  return operate('add', x, y);
}

export function sub(x, y) {
  return operate('sub', x, y);
}

export function mul(x, y) {
  return operate('mul', x, y);
}

export function div(x, y) {
  return operate('div', x, y);
}

const opTable = {};

function put(name, op, item) {
  opTable[name] = opTable[name] || {};
  opTable[name][op] = item;
}

function get(name, op) {
  return opTable[name] && opTable[name][op];
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

export function makeNumber(n) {
  return attachType('number', n);
}

put('number', 'add', addNumber);
put('number', 'sub', subNumber);
put('number', 'mul', mulNumber);
put('number', 'div', divNumber);

function operate(op, arg1, arg2) {
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

export function makeComplex(n) {
  return attachType('complex', n);
}

put('complex', 'add', addComplex);
put('complex', 'sub', subComplex);
put('complex', 'mul', mulComplex);
put('complex', 'div', divComplex);

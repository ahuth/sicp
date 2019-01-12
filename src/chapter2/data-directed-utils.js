import { cons, car, cdr, isAtom } from './pair';

const opTable = {};

export function put(name, op, item) {
  opTable[name] = opTable[name] || {};
  opTable[name][op] = item;
}

function get(name, op) {
  return opTable[name] && opTable[name][op];
}

export function operate(op, arg) {
  const proc = get(type(arg), op);
  if (proc) {
    return proc(contents(arg));
  } else {
    throw new Error('Operator undefined for type');
  }
}

export function operate2(op, arg1, arg2) {
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

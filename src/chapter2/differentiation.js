import { car, cadr, caddr, isAtom, isPair } from './pair';
import { list } from './list';

export function derive(exp, withRespectTo) {
  if (isConstant(exp, withRespectTo)) { return 0; }
  if (isVariable(exp, withRespectTo)) { return 1; }
  if (isSum(exp)) {
    // Derivative of a sum is the derivatives of the parts summed together.
    return makeSum(
      derive(addend(exp), withRespectTo),
      derive(augend(exp), withRespectTo),
    );
  }
  if (isProduct(exp)) {
    // Derivative of a product is the sum of the first times the derivative of the second and the
    // second times the derivative of the first.
    return makeSum(
      makeProduct(multiplier(exp), derive(multiplicand(exp), withRespectTo)),
      makeProduct(multiplicand(exp), derive(multiplier(exp), withRespectTo)),
    );
  }
}

export function makeSum(a1, a2) {
  if (isNumber(a1) && isNumber(a2)) { return a1 + a2; }
  if (a1 === 0) { return a2; }
  if (a2 === 0) { return a1; }
  return list('+', a1, a2);
}

export function makeProduct(m1, m2) {
  if (isNumber(m1) && isNumber(m2)) { return m1 * m2; }
  if (m1 === 0 || m2 === 0) { return 0; }
  if (m1 === 1) { return m2; }
  if (m2 === 1) { return m1; }
  return list('*', m1, m2);
}

function isSum(e) {
  return isPair(e) && car(e) === '+';
}

function isProduct(e) {
  return isPair(e) && car(e) === '*';
}

const addend = cadr;
const augend = caddr;
const multiplier = cadr;
const multiplicand = caddr;

function isConstant(exp, withRespectTo) {
  return isAtom(exp) && exp !== withRespectTo;
}

function isVariable(exp, withRespectTo) {
  return isAtom(exp) && exp === withRespectTo;
}

function isNumber(x) {
  return typeof x === 'number';
}

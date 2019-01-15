import { cons, car, cdr, isAtom } from './pair';
import { get, put } from './data-directed-utils';

export function makePolynomial(variable, termList) {
  return cons(variable, termList);
}

export const getVariable = car;
export const getTermList = cdr;

function addPoly(p1, p2) {
  if (sameVariable(p1, p2)) {
    return makePolynomial(getVariable(p1), addTerms(getTermList(p1), getTermList(p2)));
  } else {
    throw new Error('Polys not in same var -- addPoly');
  }
}

function mulPoly(p1, p2) {
  if (sameVariable(p1, p2)) {
    return makePolynomial(getVariable(p1), mulTerms(getTermList(p1), getTermList(p2)));
  } else {
    throw new Error('Polys not in same var -- mulPoly');
  }
}

put('polynomial', 'add', addPoly);
put('polynomial', 'mul', mulPoly);

function sameVariable(a, b) {
  return isAtom(a) && isAtom(b) && a === b;
}

function addTerms(l1, l2) {
  if (isEmptyTermList(l1)) { return l2; }
  if (isEmptyTermList(l2)) { return l1; }

  const t1 = getFirstTerm(l1);
  const t2 = getFirstTerm(l2);
}

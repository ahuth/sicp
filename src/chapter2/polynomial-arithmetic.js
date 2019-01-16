import { add, mul, zero } from './generic-arithmetic-operators';
import { attachType, put } from './data-directed-utils';
import { cons, car, cdr, isAtom, cadr } from './pair';
import { list, every, isEmpty } from './list';

export function makePolynomial(variable, termList) {
  return cons(variable, termList);
}

export function tagPolynomial(p) {
  return attachType('polynomial', p);
}

export const getVariable = car;
export const getTermList = cdr;

function addPoly(p1, p2) {
  if (sameVariable(getVariable(p1), getVariable(p2))) {
    return makePolynomial(getVariable(p1), addTerms(getTermList(p1), getTermList(p2)));
  } else {
    throw new Error('Polys not in same var -- addPoly');
  }
}

function mulPoly(p1, p2) {
  if (sameVariable(getVariable(p1), getVariable(p2))) {
    return makePolynomial(getVariable(p1), mulTerms(getTermList(p1), getTermList(p2)));
  } else {
    throw new Error('Polys not in same var -- mulPoly');
  }
}

function zeroPoly(p) {
  return every(getTermList(p), zero);
}

put('polynomial', 'add', addPoly);
put('polynomial', 'mul', mulPoly);
put('polynomial', 'zero', zeroPoly);

function sameVariable(a, b) {
  return isAtom(a) && isAtom(b) && a === b;
}

function addTerms(l1, l2) {
  if (isEmptyTermList(l1)) { return l2; }
  if (isEmptyTermList(l2)) { return l1; }

  const t1 = getFirstTerm(l1);
  const t2 = getFirstTerm(l2);

  if (getOrder(t1) > getOrder(t2)) {
    return adjoinTerm(
      t1,
      addTerms(getRestTerms(l1), l2),
    );
  } else if (getOrder(t1) < getOrder(t2)) {
    return adjoinTerm(
      t2,
      addTerms(l1, getRestTerms(l2)),
    );
  } else {
    return adjoinTerm(
      makeTerm(getOrder(t1), add(getCoeff(t1), getCoeff(t2))),
      addTerms(getRestTerms(l1), getRestTerms(l2)),
    );
  }
}

function mulTerms(l1, l2) {
  if (isEmptyTermList(l1)) {
    return theEmptyTermList();
  }

  return addTerms(
    mulTermByAllTerms(getFirstTerm(l1), l2),
    mulTerms(getRestTerms(l1), l2),
  );
}

function mulTermByAllTerms(t1, L) {
  if (isEmptyTermList(L)) {
    return theEmptyTermList();
  }

  const t2 = getFirstTerm(L);

  return adjoinTerm(
    makeTerm(
      getOrder(t1) + getOrder(t2), // add(getOrder(t1), getOrder(t2)); ???
      mul(getCoeff(t1), getCoeff(t2)),
    ),
    mulTermByAllTerms(t1, getRestTerms(L)),
  );
}

function adjoinTerm(term, termList) {
  if (zero(getCoeff(term))) {
    return termList;
  }
  return cons(term, termList);
}

function theEmptyTermList() {
  return list();
}

function getFirstTerm(termList) {
  return car(termList);
}

function getRestTerms(termList) {
  return cdr(termList);
}

function isEmptyTermList(termList) {
  return isEmpty(termList);
}

export function makeTerm(order, coeff) {
  return list(order, coeff);
}

function getOrder(term) {
  return car(term);
}

function getCoeff(term) {
  return cadr(term);
}

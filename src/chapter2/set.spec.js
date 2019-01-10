import { makeTree, adjoinSet } from './set';
import { toString } from './list';

test('exercises 2.33, 2.35, 2.36, and 2.37', () => {
  // const odds = list(1, 3, 5, 7);
  const odds = makeTree(
    3,
    makeTree(1),
    makeTree(
      5,
      null,
      makeTree(7),
    ),
  );

  // const evens = list(2, 4, 6, 8);
  // const primes = list(2, 3, 5, 7);

  // const otherSet = adjoinSet(evens, 666);
  // expect(toString(otherSet)).toEqual('(2 4 6 8 666)');

  let otherSet = adjoinSet(odds, 666);
  expect(toString(otherSet)).toEqual('(3 (1 () ()) (5 () (7 () (666 () ()))))');

  otherSet = adjoinSet(otherSet, 6);
  expect(toString(otherSet)).toEqual('(3 (1 () ()) (5 () (7 (6 () ()) (666 () ()))))');

  otherSet = adjoinSet(otherSet, 13);
  expect(toString(otherSet)).toEqual('(3 (1 () ()) (5 () (7 (6 () ()) (666 (13 () ()) ()))))');

  // expect(isElementOfSet(odds, 2)).toEqual(false);
  // expect(isElementOfSet(evens, 2)).toEqual(true);
  // expect(isElementOfSet(primes, 2)).toEqual(true);

  // expect(toString(intersectionSet(odds, evens))).toEqual('()');
  // expect(toString(intersectionSet(odds, primes))).toEqual('(3 5 7)');
  // expect(toString(intersectionSet(evens, primes))).toEqual('(2)');

  // expect(toString(unionSet(odds, evens))).toEqual('(1 2 3 4 5 6 7 8)');
  // expect(toString(unionSet(odds, primes))).toEqual('(1 2 3 5 7)');
  // expect(toString(unionSet(evens, primes))).toEqual('(2 3 4 5 6 7 8)');
});

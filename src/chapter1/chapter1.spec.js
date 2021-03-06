import {
  countChange,
  cubeRoot,
  exp,
  gcd,
  product,
  smallestDivisor,
  sumTwoLargestSquares,
  sqrt
} from './chapter1';

test('exercise 1.2', () => {
  expect(sumTwoLargestSquares(1, 2, 3)).toEqual(13);
});

test('exercise 1.5', () => {
  expect(sqrt(137)).toBeCloseTo(11.7046999177, 8);
});

test('exercise 1.6', () => {
  expect(cubeRoot(137)).toBeCloseTo(5.1551367355, 8);
});

test('exercise 1.9', () => {
  expect(countChange(100)).toEqual(292);
});

test('exercise 1.11', () => {
  expect(exp(4, 4)).toEqual(256);
  expect(exp(2, 13)).toEqual(8192);
  expect(exp(3, 9)).toEqual(19683);
});

test('greatest common denominator', () => {
  expect(gcd(204, 40)).toEqual(4);
  expect(gcd(93, 13)).toEqual(1);
  expect(gcd(1000, 100)).toEqual(100);
  expect(gcd(240,40)).toEqual(40);
});

test('exercise 1.16', () => {
  expect(smallestDivisor(199)).toEqual(199);
  expect(smallestDivisor(1999)).toEqual(1999);
  expect(smallestDivisor(19999)).toEqual(7);
})

test('exercise 1.25', () => {
  const identity = a => a;
  const increment = a => a + 1;
  const doubleIncrement = a => a + 2;
  expect(product(identity, 2, doubleIncrement, 6)).toEqual(48);

  const factorial = product.bind(null, identity, 1, increment);
  expect(factorial(5)).toEqual(120);
});

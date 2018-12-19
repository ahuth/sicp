import { countChange, cubeRoot, sumTwoLargestSquares, sqrt } from './chapter1';

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

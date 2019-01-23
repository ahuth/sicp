import makeAccumulator from './accumulator';

test('Exercise 3.1', () => {
  const a = makeAccumulator(5);
  expect(a(10)).toEqual(15);
  expect(a(10)).toEqual(25);
});

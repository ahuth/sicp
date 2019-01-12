import { makePoint, getX, getY } from './point';

test('points', () => {
  const point = makePoint(4, 5);
  expect(getX(point)).toEqual(4);
  expect(getY(point)).toEqual(5);
});

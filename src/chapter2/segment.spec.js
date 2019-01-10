import { makePoint, getX, getY } from './point';
import { makeSegment, midPoint, startPoint, endPoint } from './segment';

test('exercise 2.2', () => {
  const a = makePoint(2, 3);
  const b = makePoint(8, 4);
  const s = makeSegment(a, b);
  const m = midPoint(s);

  expect(startPoint(s)).toEqual(a);
  expect(endPoint(s)).toEqual(b);
  expect(getX(m)).toEqual(5);
  expect(getY(m)).toEqual(3.5);
});

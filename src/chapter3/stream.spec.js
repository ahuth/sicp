import {
  enumerateInterval,
  mapStream,
  accumulateStream,
} from './stream';

test('basic stream operations', () => {
  const stream = enumerateInterval(1, 3);
  const mapped = mapStream(stream, x => x * 2);
  const reduced = accumulateStream(mapped, (acc, x) => acc + x, 0);
  expect(reduced).toEqual(12);
});

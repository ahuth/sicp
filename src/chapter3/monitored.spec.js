import makeMonitored from './monitored';

test('Exercise 3.2', () => {
  const inc = x => x + 1;
  const monitored = makeMonitored(inc);

  expect(monitored('how-many-calls?')).toEqual(0);

  expect(monitored(1)).toEqual(2);
  expect(monitored('how-many-calls?')).toEqual(1);

  expect(monitored(2)).toEqual(3);
  expect(monitored('how-many-calls?')).toEqual(2);

  expect(monitored(3)).toEqual(4);
  expect(monitored('how-many-calls?')).toEqual(3);

  expect(monitored(666)).toEqual(667);
  expect(monitored('how-many-calls?')).toEqual(4);
})

import { insert, lookup, makeTable } from './table';

test('tables', () => {
  const t = makeTable();
  expect(lookup(t, 'hello')).toEqual(null);

  insert(t, 'hello', 'world');
  expect(lookup(t, 'hello')).toEqual('world');
});

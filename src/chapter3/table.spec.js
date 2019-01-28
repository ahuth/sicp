import { insert, lookup, makeTable } from './table';

test('tables', () => {
  const t = makeTable();
  expect(lookup(t, 'hello')).toEqual(null);

  insert(t, 'hello', 'world');
  expect(lookup(t, 'hello')).toEqual('world');
});

test('2-dimensional tables', () => {
  const t = makeTable();
  insert(t, 'abc', makeTable());
  insert(lookup(t, 'abc'), '123', 'hello there');
  expect(lookup(lookup(t, 'abc'), '123')).toEqual('hello there');
});

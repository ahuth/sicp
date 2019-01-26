import { deleteQueue, isEmptyQueue, front, insertQueue, makeQueue, toString } from './queue';

test('queues', () => {
  const q = makeQueue();
  expect(isEmptyQueue(q)).toEqual(true);
  expect(() => front(q)).toThrowError('Front called with empty queue');
  expect(toString(q)).toEqual('()');

  insertQueue(q, 6);
  expect(isEmptyQueue(q)).toEqual(false);
  expect(front(q)).toEqual(6);
  expect(toString(q)).toEqual('(6)');

  insertQueue(q, 4);
  expect(isEmptyQueue(q)).toEqual(false);
  expect(front(q)).toEqual(6);
  expect(toString(q)).toEqual('(6 4)');

  deleteQueue(q)
  expect(isEmptyQueue(q)).toEqual(false);
  expect(front(q)).toEqual(4);
  expect(toString(q)).toEqual('(4)');

  deleteQueue(q)
  expect(isEmptyQueue(q)).toEqual(true);
  expect(toString(q)).toEqual('()');
});

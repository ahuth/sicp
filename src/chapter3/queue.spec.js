import { deleteQueue, isEmptyQueue, front, insertQueue, makeQueue } from './queue';

test('queues', () => {
  const q = makeQueue();
  expect(isEmptyQueue(q)).toEqual(true);
  expect(() => front(q)).toThrowError('Front called with empty queue');

  insertQueue(q, 6);
  expect(isEmptyQueue(q)).toEqual(false);
  expect(front(q)).toEqual(6);

  insertQueue(q, 4);
  expect(isEmptyQueue(q)).toEqual(false);
  expect(front(q)).toEqual(6);

  deleteQueue(q)
  expect(isEmptyQueue(q)).toEqual(false);
  expect(front(q)).toEqual(4);

  deleteQueue(q)
  expect(isEmptyQueue(q)).toEqual(true);
});

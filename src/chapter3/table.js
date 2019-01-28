import { cons, car, cdr, setCdr } from './pair';
import { list, isEmpty } from './list';

export function makeTable() {
  return list('*table*');
}

export function lookup(table, key) {
  const record = assq(key, cdr(table));

  if (isEmpty(record)) { return record; }

  return cdr(record);
}

export function insert(table, key, value) {
  const record = assq(key, cdr(table));

  if (isEmpty(record)) {
    setCdr(
      table,
      cons(
        cons(key, value),
        cdr(table),
      ),
    );
  } else {
    setCdr(record, value);
  }

  return 'ok';
}

function assq(key, records) {
  if (isEmpty(records)) { return records; }

  if (isEqual(car(car(records)), key)) {
    return car(records);
  }

  return assq(key, cdr(records));
}

function isEqual(a, b) {
  return a === b;
}

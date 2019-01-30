import {
  addAction,
  andGate,
  getSignal,
  inverter,
  makeWire,
  orGate,
  setSignal,
} from './wire';

test('wires', () => {
  const w = makeWire();
  expect(getSignal(w)).toEqual(0);
  setSignal(w, 1);
  expect(getSignal(w)).toEqual(1);

  const action = jest.fn();
  addAction(w, action);
  expect(action.mock.calls.length).toEqual(1);

  setSignal(w, 1);
  expect(action.mock.calls.length).toEqual(1);

  setSignal(w, 0);
  expect(action.mock.calls.length).toEqual(2);
});

test('inverters', (done) => {
  const x = makeWire(0);
  const y = makeWire(1);
  const promise = inverter(x, y);

  setSignal(x, 1);
  expect(getSignal(y)).toEqual(1);

  promise.then(() => {
    expect(getSignal(y)).toEqual(0);
    done();
  });
});

test('and gates', (done) => {
  const x = makeWire(0);
  const y = makeWire(1);
  const z = makeWire(0);
  const promise = andGate(x, y, z);

  setSignal(x, 1);
  expect(getSignal(z)).toEqual(0);

  promise.then(() => {
    expect(getSignal(z)).toEqual(1);
    done();
  });
});

test('or gates', (done) => {
  const x = makeWire(0);
  const y = makeWire(0);
  const z = makeWire(0);
  const promise = orGate(x, y, z);

  setSignal(y, 1);
  expect(getSignal(z)).toEqual(0);

  promise.then(() => {
    expect(getSignal(z)).toEqual(1);
    done();
  });
});

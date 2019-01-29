import {
  addAction,
  andGate,
  getSignal,
  inverter,
  makeWire,
  setSignal,
} from './wire';

test('wires', () => {
  const w = makeWire();
  expect(getSignal(w)).toEqual(0);
  setSignal(w, 1);
  expect(getSignal(w)).toEqual(1);

  const action = jest.fn();
  addAction(w, action);
  setSignal(w, 1);
  expect(action).not.toBeCalled();
  setSignal(w, 0);
  expect(action).toBeCalled();
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

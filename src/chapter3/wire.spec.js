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

test('inverters', () => {
  const x = makeWire();
  const y = makeWire();

  inverter(x, y);
  expect(getSignal(y)).toEqual(1);

  setSignal(x, 1);
  expect(getSignal(y)).toEqual(0);
});

test('and gates', () => {
  const x = makeWire();
  const y = makeWire();
  const z = makeWire();

  andGate(x, y, z);
  expect(getSignal(z)).toEqual(0);

  setSignal(x, 1);
  expect(getSignal(z)).toEqual(0);

  setSignal(y, 1);
  expect(getSignal(z)).toEqual(1);
});

test('or gates', () => {
  const x = makeWire();
  const y = makeWire();
  const z = makeWire();

  orGate(x, y, z);
  expect(getSignal(z)).toEqual(0);

  setSignal(y, 1);
  expect(getSignal(z)).toEqual(1);
});

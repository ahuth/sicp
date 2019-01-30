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
  const x = makeWire();
  const y = makeWire();

  inverter(x, y).then(() => {
    expect(getSignal(y)).toEqual(1);
    return setSignal(x, 1);
  }).then(() => {
    expect(getSignal(y)).toEqual(0);
    done();
  });
});

test('and gates', (done) => {
  const x = makeWire();
  const y = makeWire();
  const z = makeWire();

  andGate(x, y, z).then(() => {
    expect(getSignal(z)).toEqual(0);
    return setSignal(x, 1);
  }).then(() => {
    expect(getSignal(z)).toEqual(0);
    return setSignal(y, 1);
  }).then(() => {
    expect(getSignal(z)).toEqual(1);
    done();
  });
});

test('or gates', () => {
  const x = makeWire();
  const y = makeWire();
  const z = makeWire();

  orGate(x, y, z).then(() => {
    expect(getSignal(z)).toEqual(0);
    return setSignal(y, 1);
  }).then(() => {
    expect(getSignal(z)).toEqual(1);
    done();
  });
});

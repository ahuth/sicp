import { addAction, getSignal, makeWire, setSignal } from './circuit';

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

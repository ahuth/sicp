import {
  makeConnector,
  adder,
  multiplier,
  constant,
  getValue,
  setValue,
  forgetValue,
} from './constraint';

test('simple constraint', () => {
  function double(x, result) {
    const two = makeConnector();
    constant(2, two);
    multiplier(x, two, result);
  }

  const input = makeConnector();
  const result = makeConnector();
  double(input, result);

  setValue(input, 2, 'user');
  expect(getValue(input)).toEqual(2);
  expect(getValue(result)).toEqual(4);

  forgetValue(input, 'user');
  setValue(result, 6, 'user');
  expect(getValue(input)).toEqual(3);
});

test('Celsius to Fahrenheit', () => {
  function centigradeFahrenheitConverter(c, f) {
    const u = makeConnector();
    const v = makeConnector();
    const w = makeConnector();
    const x = makeConnector();
    const y = makeConnector();

    multiplier(c, w, u);
    multiplier(v, x, u);
    adder(v, y, f);
    constant(9, w);
    constant(5, x);
    constant(32, y);
  };

  // const C = makeConnector();
  // const F = makeConnector();
  // centigradeFahrenheitConverter(C, F);

  // setValue(C, 25);
  // expect(getValue(F)).toBeCloseTo(77);

  // expect(() => setValue(F, 212)).toThrowError('Contradicting values! 77, 212');
  // forgetValue(C);

  // setValue(F, 212);
  // expect(getValue(C)).toBeCloseTo(100);
});

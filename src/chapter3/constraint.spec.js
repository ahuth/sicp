import {
  makeConnector,
  adder,
  multiplier,
  constant,
  getValue,
  setValue,
  forgetValue,
} from './constraint';

test('doubler', () => {
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

test('double incrementer', () => {
  function doubleIncrement(x, result) {
    const two = makeConnector();
    constant(2, two);
    adder(x, two, result);
  }

  const input = makeConnector();
  const result = makeConnector();
  doubleIncrement(input, result);

  setValue(input, 1, 'user');
  expect(getValue(input)).toEqual(1);
  expect(getValue(result)).toEqual(3);

  forgetValue(input, 'user');
  setValue(result, 7, 'user');
  expect(getValue(input)).toEqual(5);
});

test('double and increment', () => {
  function doubleAndIncrement(x, result) {
    const one = makeConnector();
    constant(1, one);

    const two = makeConnector();
    constant(2, two);

    const temp = makeConnector();
    multiplier(x, two, temp);
    adder(temp, one, result)
  }

  const input = makeConnector();
  const result = makeConnector();
  doubleAndIncrement(input, result);

  setValue(input, 4, 'user');
  expect(getValue(input)).toEqual(4);
  expect(getValue(result)).toEqual(9);

  forgetValue(input, 'user');
  setValue(result, 15, 'user');
  expect(getValue(input)).toEqual(7);
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

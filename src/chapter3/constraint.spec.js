import {
  makeConnector,
  makeAdder,
  makeMultiplier,
  makeDivider,
  makeConstant,
  getValue,
  setValue,
  forgetValue,
} from './constraint';

test('doubler', () => {
  function double(x) {
    return makeMultiplier(x, makeConstant(2));
  }

  const input = makeConnector();
  const result = double(input);

  setValue(input, 2, 'user');
  expect(getValue(input)).toEqual(2);
  expect(getValue(result)).toEqual(4);

  forgetValue(input, 'user');
  setValue(result, 6, 'user');
  expect(getValue(input)).toEqual(3);
});

test('double incrementer', () => {
  function doubleIncrement(x) {
    return makeAdder(x, makeConstant(2));
  }

  const input = makeConnector();
  const result = doubleIncrement(input);

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

  function doubleAndIncrement(x) {
    return makeAdder(
      makeConstant(1),
      makeMultiplier(makeConstant(2), x),
    );
  }

  const input = makeConnector();
  const result = doubleAndIncrement(input);

  setValue(input, 4, 'user');
  expect(getValue(input)).toEqual(4);
  expect(getValue(result)).toEqual(9);

  forgetValue(input, 'user');
  setValue(result, 15, 'user');
  expect(getValue(input)).toEqual(7);
});

test('Celsius to Fahrenheit', () => {
  function makeConverter(c) {
    return makeAdder(
      makeMultiplier(
        c,
        makeDivider(makeConstant(9), makeConstant(5)),
      ),
      makeConstant(32),
    );
  }

  const C = makeConnector();
  const F = makeConverter(C);

  setValue(C, 25, 'user');
  expect(getValue(F)).toEqual(77);

  expect(() => setValue(F, 212)).toThrowError('Contradicting values! 77, 212');
  forgetValue(C, 'user');

  setValue(F, 212, 'user');
  expect(getValue(C)).toEqual(100);
});

test('averager', () => {
  function average(a, b) {
    return makeDivider(
      makeAdder(a, b),
      makeConstant(2),
    );
  }

  const a = makeConnector();
  const b = makeConnector();
  const result = average(a, b);

  setValue(a, 4, 'user');
  setValue(b, 8, 'user');
  expect(getValue(result)).toEqual(6);
});

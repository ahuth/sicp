export function sumTwoLargestSquares(a, b, c) {
  return twoLargest(a, b, c).map(square).reduce(add);
}

export function sqrt(x) {
  return newtonsMethod(y => x - square(y), 1);
}

export function cubeRoot(x) {
  return fixedPoint(function (y) {
    return (x / square(y) + 2 * y) / 3;
  }, 1);
}

export function countChange(amount) {
  return countFifties(amount, 0);
}

function countFifties(amount, acc) {
  if (amount === 0) { return acc + 1; }
  if (amount < 0) { return acc; }
  return countFifties(amount - 50, countQuarters(amount, acc));
}

function countQuarters(amount, acc) {
  if (amount === 0) { return acc + 1; }
  if (amount < 0) { return acc; }
  return countQuarters(amount - 25, countDimes(amount, acc));
}

function countDimes(amount, acc) {
  if (amount === 0) { return acc + 1; }
  if (amount < 0) { return acc; }
  return countDimes(amount - 10, countNickels(amount, acc));
}

function countNickels(amount, acc) {
  if (amount === 0) { return acc + 1; }
  if (amount < 0) { return acc; }
  return countNickels(amount - 5, countPennies(amount, acc));
}

function countPennies(_amount, acc) {
  return acc + 1;
}

function newtonsMethod(f, guess) {
  const dF = derive(f);
  return fixedPoint(x => x - (f(x) / dF(x)), guess);
}

function derive(f) {
  const dX = 0.000001;
  return x => (f(x + dX) - f(x)) / dX;
}

function fixedPoint(f, start) {
  function iter(current, prev) {
    if (goodEnough(current, prev)) {
      return current;
    }
    return iter(f(current), current);
  }

  return iter(f(start), start);
}

function square(a) {
  return a * a;
}

function add(a, b) {
  return a + b;
}

function twoLargest(a, b, c) {
  if (a > c && b > c) {
    return [a, b];
  }
  if (b > a && c > a) {
    return [b, c];
  }
  if (a > b && c > b) {
    return [a, c];
  }
}

function goodEnough(guess, prev) {
  return Math.abs(guess - prev) < guess / 1000;
}

export function sumTwoLargestSquares(a, b, c) {
  return twoLargest(a, b, c).map(square).reduce(add);
}

export function sqrt(x) {
  return fixedPoint(averageDamp(function (y) {
    return x / y;
  }), 1);
}

export function cubeRoot(x) {
  return fixedPoint(function (y) {
    return (x / square(y) + 2 * y) / 3;
  }, 1);
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

function averageDamp(f) {
  return function (x) {
    return average(f(x), x);
  };
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

function average(a, b) {
  return (a + b) / 2;
}

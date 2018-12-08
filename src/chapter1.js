export function sumTwoLargestSquares(a, b, c) {
  return twoLargest(a, b, c).map(square).reduce(add);
}

export function sqrt(x) {
  return newtonsMethod(x, function (x, guess) {
    return average(guess, x / guess);
  });
}

export function cubeRoot(x) {
  return newtonsMethod(x, function (x, guess) {
    return (x / square(guess) + 2 * guess) / 3;
  });
}

function newtonsMethod(x, improve) {
  function iter(guess, prev) {
    if (goodEnough(guess, prev)) {
      return guess;
    }
    return iter(improve(x, guess), guess);
  }

  return iter(1, 0);
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

export function sumTwoLargestSquares(a, b, c) {
  return twoLargest(a, b, c).map(square).reduce(add);
}

export function sqrt(x, guess = 1, prev = 0) {
  if (goodEnough(guess, prev)) {
    return guess;
  }
  return sqrt(x, improveGuess(x, guess), guess);
}

export function cubeRoot(x, guess = 1, prev = 0) {
  if (goodEnough(guess, prev)) {
    return guess;
  }
  return cubeRoot(x, improveGuess2(x, guess), guess);
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

function improveGuess(x, guess) {
  return average(guess, x / guess);
}

function improveGuess2(x, guess) {
  return (x / square(guess) + 2 * guess) / 3;
}

function average(a, b) {
  return (a + b) / 2;
}

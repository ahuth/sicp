import monteCarlo from './monte-carlo';
import { gcd, sqrt } from '../chapter1';

function estimatePi(trials) {
  return sqrt(6 / monteCarlo(trials, cesaroTest));
}

function cesaroTest() {
  return gcd(randomInt(1000), randomInt(1000)) === 1;
}

function randomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

test('estimating pi', () => {
  expect(estimatePi(1000)).toBeCloseTo(3.1, 1);
});

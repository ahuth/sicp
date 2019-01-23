import monteCarlo from './monte-carlo';
import randomInt from './random-int';
import { gcd, sqrt } from '../chapter1';

function estimatePi(trials) {
  return sqrt(6 / monteCarlo(trials, cesaroTest));
}

function cesaroTest() {
  return gcd(randomInt(0, 1000), randomInt(0, 1000)) === 1;
}

test('estimating pi', () => {
  expect(estimatePi(1000)).toBeCloseTo(3.14, 0);
});

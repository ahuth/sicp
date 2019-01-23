export default function monteCarlo(trials, experiment) {
  function iter(trialsRemaining, trialsPassed) {
    if (trialsRemaining === 0) {
      return trialsPassed / trials;
    }
    if (experiment()) {
      return iter(trialsRemaining - 1, trialsPassed + 1);
    }
    return iter(trialsRemaining - 1, trialsPassed);
  }

  return iter(trials, 0);
}

export default function makeMonitored(func) {
  let numCalls = 0;

  return function (x) {
    if (x === 'how-many-calls?') { return numCalls; }
    numCalls = numCalls + 1;
    return func(x);
  };
}

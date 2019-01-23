export default function makeAccumulator(value = 0) {
  return function (x) {
    value = value + x;
    return value;
  };
}

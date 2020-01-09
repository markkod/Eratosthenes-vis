const primeRange = (start, end) =>
  Array(end - start + 1)
    .fill()
    .map((_, idx) => start + idx);

function eratosthenes(n) {
  var p = 2;
  var range = primeRange(p, n);
  while (p < n) {
    range = range.filter((el, idx) => el === p || el % p !== 0)
    p = range[range.indexOf(p) + 1]
  }
  return range
}

console.log(eratosthenes(50));
const range = (start, end) =>
  Array(end - start + 1)
    .fill()
    .map((_, idx) => start + idx);

function eratosthenes(n) {
  var p = 2;
  var primeRange = range(p, n);
  while (p < n) {
    primeRange = primeRange.filter(el => el === p || el % p !== 0)
    p = primeRange[primeRange.indexOf(p) + 1]
  }
  return primeRange
}

console.log(eratosthenes(50));
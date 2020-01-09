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
  return primeRange;
}

function sundaram(n) {
  const k = (n - 2) / 2; // Sieve of Sundaram produces primes smaller than 2n + 2
  const marked = Array(k).fill(0);

  for (i = 1; i <= k; i++) {
    for (j = i; (i + j + 2 * i * j) <= k; j++) {
      marked[i + j + 2 * i * j] = 1;
    }
  }
  // todo: refactor the below part
  result = [];
  if (n > 2) {
    result.push(2);
  }
  for (i = 1; i <= k; i++) {
    if (marked[i] == 0) {
      result.push(2 * i + 1)
    }
  }
  return result
}

console.log(eratosthenes(50));
console.log(sundaram(50));
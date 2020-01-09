const primeRange = (start, end) =>
  Array(end - start + 1)
    .fill()
    .map((_, idx) => start + idx);

// needs to be made more efficient as each indexOf and filter operations is O(n)...
function eratosthenes(n) {
  var p = 2;
  const range = primeRange(p, n);
  const primeIndices = new Array(range.length).fill(1);

  while (p < n) {
    primeIndices.forEach((_, idx) =>
      range[idx] % p === 0 && range[idx] !== p ? (primeIndices[idx] = 0) : 1
    );
    p = range[primeIndices.indexOf(1, range.indexOf(p) + 1)];
  }

  return range.filter((_, idx) => primeIndices[idx] !== 0);
}

console.log(eratosthenes(50));
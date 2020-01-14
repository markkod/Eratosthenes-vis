export const getArrayOfRange = (start, end) =>
  Array(end - start + 1)
    .fill()
    .map((_, idx) => start + idx);


export const ALGORITHMS = {
<<<<<<< HEAD
  ERRATOSTHENES: "ERRATOSTHENES",
  SUNDARAM: "SUNDARAM"
=======
  ERATOSTHENES: "ERATOSTHENES",
  EULER: "EULER",
  ATKINS: "ATKINS",
>>>>>>> 66dc75456a9024ce80ba9b90d6b6370d3407e5fb
}
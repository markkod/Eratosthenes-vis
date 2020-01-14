export const getArrayOfRange = (start, end) =>
  Array(end - start + 1)
    .fill()
    .map((_, idx) => start + idx);


export const ALGORITHMS = {
  ERRATOSTHENES: "ERRATOSTHENES",
  SUNDARAM: "SUNDARAM"
}
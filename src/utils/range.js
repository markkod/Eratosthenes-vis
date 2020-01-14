export const getArrayOfRange = (start, end) =>
  Array(end - start + 1)
    .fill()
    .map((_, idx) => start + idx);


export const ALGORITHMS = {
  ERATOSTHENES: "ERATOSTHENES",
  SUNDARAM: "SUNDARAM"
}

export const randomColour = () => {
  const rand = Math.random()
  return "#000000".replace(/0/g,function(){return (~~(rand*16)).toString(16);})
}

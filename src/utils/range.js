export const getArrayOfRange = (start, end) =>
  Array(end - start + 1)
    .fill()
    .map((_, idx) => start + idx);


export const ALGORITHMS = {
  ERATOSTHENES: "ERATOSTHENES",
<<<<<<< HEAD
  SUNDARAM: "SUNDARAM"
}
=======
  EULER: "EULER",
  ATKINS: "ATKINS",
}

export const randomColour = () => {
  const rand = Math.random()
  return "#000000".replace(/0/g,function(){return (~~(rand*16)).toString(16);})
}
>>>>>>> d0f53f52076fcfec6d4cce6f81e762bf6303da2a

export const returnSquareMatrixSum = (matrix: number[][]) => {
  const nMatrix = matrix.length
  let sum = 0
  for (let i = 0; i < nMatrix; i++) {
    for (let j = 0; j < nMatrix; j++) {
      sum += matrix[i][j]
    }
  }
  return sum
}

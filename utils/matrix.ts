export const returnMatrixSum = (matrix: number[][]) => {
  const mMatrix = matrix.length
  const nMatrix = matrix[0].length
  let sum = 0
  for (let i = 0; i < mMatrix; i++) {
    for (let j = 0; j < nMatrix; j++) {
      sum += matrix[i][j]
    }
  }
  return sum
}

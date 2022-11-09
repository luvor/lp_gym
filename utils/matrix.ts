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

export function sum(array: number[]) {
  return array.reduce((partialSum, a) => partialSum + a, 0)
}

export function mean(array: number[]) {
  return sum(array) / array.length
}

export function minFunction(array: number[]) {
  let min = Infinity

  for (let i = 0; i < array.length; i++) {
    if (array[i] < min) {
      min = array[i]
    }
  }

  return min
}

export function maxFunction(array: number[]) {
  let maxValue = 0

  for (let i = 0; i < array.length; i++) {
    if (array[i] > maxValue) {
      maxValue = array[i]
    }
  }

  return maxValue
}

// Критерий Гурвица
export function hurwitz(matrix: number[][], lambda: any) {
  const newArray = []
  for (let i = 0; i < matrix.length; i++) {
    newArray.push(minFunction(matrix[i]) * (1 - lambda) + maxFunction(matrix[i]) * lambda)
  }

  let maxValue = 0
  let maxIndex = 0

  for (let i = 0; i < newArray.length; i++) {
    if (maxFunction(newArray) > maxValue) {
      maxValue = maxFunction(newArray)
      maxIndex = i
    }
  }

  return { index: maxIndex, strategies: matrix[maxIndex] }
}

// Критерий Сэвиджа - минимизация рисков
export function savageRisks(matrix: number[][]) {
  const newArray = []
  for (let i = 0; i < matrix.length; i++) {
    const a = []
    for (let j = 0; j < matrix[i].length; j++) {
      a.push(maxFunction(matrix[i]) - matrix[i][j])
    }
    newArray.push(a)
  }
  let minValue = Infinity
  let minIndex = 0

  for (let i = 0; i < newArray.length; i++) {
    if (maxFunction(newArray[i]) < minValue) {
      minValue = maxFunction(newArray[i])
      minIndex = i
    }
  }
  // console.log({ index: minIndex, strategies: matrix[minIndex] })
  return { index: minIndex, strategies: matrix[minIndex] }
}

// Критерий Вальда - Максимакс
export function maximax(matrix: number[][]) {
  let maxValue = 0
  let maxIndex = 0

  for (let i = 0; i < matrix.length; i++) {
    if (maxFunction(matrix[i]) > maxValue) {
      maxValue = maxFunction(matrix[i])
      maxIndex = i
    }
  }

  return { index: maxIndex, strategies: matrix[maxIndex] }
}

// Критерий Вальда - Максимин
export function maximin(matrix: number[][]) {
  let minValue = Infinity
  let minIndex = 0

  for (let i = 0; i < matrix.length; i++) {
    if (minFunction(matrix[i]) < minValue) {
      minValue = minFunction(matrix[i])
      minIndex = i
    }
  }

  return { index: minIndex, strategies: matrix[minIndex] }
}

//  Критерий Лапласа относительно рисков

export function laplaceRisks(matrix: number[][]) {
  let min = Infinity
  let minIndex = 0

  for (let i = 0; i < matrix.length; i++) {
    if (mean(matrix[i]) < min) {
      min = mean(matrix[i])
      minIndex = i
    }
  }

  return { index: minIndex, strategies: matrix[minIndex] }
}

// Критерий Лапласа относительно выигрышей

export function laplaceWin(matrix: number[][]) {
  let max = 0
  let maxIndex = 0

  for (let i = 0; i < matrix.length; i++) {
    if (mean(matrix[i]) > max) {
      max = mean(matrix[i])
      maxIndex = i
    }
  }

  return { index: maxIndex, strategies: matrix[maxIndex] }
}

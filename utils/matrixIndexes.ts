const alphabet = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split('')

export const alphaIndexes = alphabet.concat(
  alphabet.map((i) => i + i),
  alphabet.map((i) => i + i + i),
  alphabet.map((i) => i + i + i + i)
)

export const numberIndexes = [...Array(100).keys()]

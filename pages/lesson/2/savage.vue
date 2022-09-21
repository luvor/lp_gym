<script lang="ts" setup>
import { ref } from 'vue'
import { MatrixMethods } from '~~/enums'
import { returnSquareMatrixSum } from '~~/utils/matrix'
const matrixArray = Array.from(new Array(100), () => new Array(100).fill(0))

const nMatrix = ref(0)
const matrix = ref(matrixArray)

const method = ref('')
const solution = ref()

const giveSolution = () => {
  const newVal = nMatrix.value
  const finalMat = matrix.value.slice(0, newVal).map((item) => item.slice(0, newVal))

  let answer = null

  if (method.value === MatrixMethods.sum) {
    answer = returnSquareMatrixSum(finalMat)
  }

  if (answer) {
    solution.value = answer
  } else {
    solution.value = 'Нет решения'
  }
}

const clearMatrix = () => {
  console.log('clear')

  matrix.value = Array.from(new Array(100), () => new Array(100).fill(0))
  solution.value = ''
}
</script>
<template>
  <div class="min-h-screen bg-gray-100 p-8">
    <div class="p-4">
      <section class="flex items-center rounded-md bg-white p-4">
        <h2 class="mr-4">Введите размерность матрицы:</h2>
        <input
          v-model="nMatrix"
          type="number"
          pattern="[0-9.]+"
          class="hidden-arrows w-[60px] appearance-none rounded-md border-none bg-gray-100 p-1 text-center text-lg"
        />
      </section>
      <section v-show="nMatrix > 0" class="my-4 flex flex-col items-center rounded-md bg-white p-4">
        <h2 class="mr-4 mb-2">Введите матрицу:</h2>
        <div class="flex flex-col overflow-scroll">
          <div v-for="(_, ind) in nMatrix" :key="ind" class="flex max-w-full">
            <input
              v-for="(_2, jnd) in nMatrix"
              :key="jnd"
              v-model="matrix[ind][jnd]"
              type="number"
              pattern="[0-9.]+"
              class="hidden-arrows m-2 w-[60px] appearance-none rounded-md border-none bg-gray-100 p-1 text-center text-lg"
            />
          </div>
        </div>
      </section>

      <section v-show="nMatrix > 0" class="my-4 flex items-center rounded-md bg-white p-4">
        <h2 class="mr-4">Выберите метод:</h2>
        <select
          v-model="method"
          class="hidden-arrows appearance-none rounded-md border-none bg-gray-100 p-1 text-center text-lg"
        >
          <option value="">Выберите метод</option>
          <option value="sum">Сумма</option>
          <option value="savage">Критерий Сэвиджа</option>
        </select>
      </section>

      <section v-show="nMatrix > 0" class="my-4 flex items-center rounded-md bg-white p-4">
        <button
          class="cursor-pointer rounded border-none bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
          @click="giveSolution"
        >
          Решить
        </button>
        <button
          class="mx-4 cursor-pointer rounded border-none bg-red-500 py-2 px-4 font-bold text-white hover:bg-red-700"
          @click="clearMatrix"
        >
          Очистить матрицу
        </button>
      </section>

      <section v-show="nMatrix > 0" class="my-4 flex items-center rounded-md bg-white p-4">
        <h2 class="mr-2 text-2xl font-bold">Ответ:</h2>
        <p class="text-2xl">{{ solution }}</p>
      </section>
    </div>
  </div>
</template>
<style>
/* Chrome, Safari, Edge, Opera */
input.hidden-arrows::-webkit-outer-spin-button,
input.hidden-arrows::-webkit-inner-spin-button {
  appearance: none;
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type='number'].hidden-arrows {
  appearance: none;
  -moz-appearance: textfield;
}
</style>

<script lang="ts" setup>
import { ref } from 'vue'
import { useToast } from 'primevue/usetoast'

import { MatrixMethods } from '~~/enums'
import { hurwitz, laplaceRisks, laplaceWin, maximax, maximin, returnMatrixSum, savageRisks } from '~~/utils/matrix'

const toast = useToast()

const matrixArray = Array.from(new Array(100), () => new Array(100).fill(0))

const nMatrix = ref(0)
const mMatrix = ref(0)
const hurwitzAlpha = ref(0.7)

const matrix = ref(matrixArray)

const method = ref('')
const solution = ref()

const isProcessing = ref(false)
const isSolved = ref(false)

watch(
  () => [nMatrix.value, mMatrix.value],
  () => {
    if (nMatrix.value > 99 || mMatrix.value > 99) {
      toast.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Размер матрицы не может быть больше 99x99',
        life: 3000
      })
    }
  }
)

const giveSolution = () => {
  isProcessing.value = true

  // console.log('method', method.value)

  if (!method.value) {
    toast.add({ severity: 'error', summary: 'Error', detail: 'Выберите метод', life: 3000 })
    isProcessing.value = false
    return
  }

  if (nMatrix.value > 99 || mMatrix.value > 99) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Размер матрицы не может быть больше 99x99',
      life: 3000
    })
    isProcessing.value = false
    return
  }

  const finalMat = matrix.value.slice(0, mMatrix.value).map((item) => item.slice(0, nMatrix.value))

  // console.log(finalMat)

  let answer = null

  if (method.value === MatrixMethods.sum) {
    answer = returnMatrixSum(finalMat)
  } else if (method.value === MatrixMethods.hurwitz) {
    answer = hurwitz(finalMat, hurwitzAlpha.value)
  } else if (method.value === MatrixMethods.savage) {
    answer = savageRisks(finalMat)
  } else if (method.value === MatrixMethods.waldMaxMax) {
    answer = maximax(finalMat)
  } else if (method.value === MatrixMethods.waldMaxMin) {
    answer = maximin(finalMat)
  } else if (method.value === MatrixMethods.laplaceRisks) {
    answer = laplaceRisks(finalMat)
  } else if (method.value === MatrixMethods.laplaceWin) {
    answer = laplaceWin(finalMat)
  }

  if (answer) {
    solution.value = answer
  } else {
    solution.value = 'Нет решения'
  }

  setTimeout(() => {
    isProcessing.value = false
    isSolved.value = true
  }, 1000)
}

const clearMatrix = () => {
  // console.log('clear')

  matrix.value = Array.from(new Array(100), () => new Array(100).fill(0))
  solution.value = ''
}
</script>
<template>
  <div class="min-h-screen bg-gray-100 p-8">
    <div class="p-4">
      <section class="flex items-center justify-center rounded-md bg-white p-4">
        <h2 class="mr-4">Введите размерность матрицы:</h2>
        <input
          v-model="nMatrix"
          type="number"
          max="99"
          maxlength="2"
          pattern="[0-9.]+"
          class="hidden-arrows w-[60px] appearance-none rounded-md border-none bg-gray-100 p-1 text-center text-lg"
        />
        <input
          v-model="mMatrix"
          type="number"
          maxlength="2"
          max="99"
          pattern="[0-9.]+"
          class="hidden-arrows ml-2 w-[60px] appearance-none rounded-md border-none bg-gray-100 p-1 text-center text-lg"
        />
      </section>
      <section v-show="nMatrix > 0 && mMatrix > 0" class="my-4 flex flex-col items-center rounded-md bg-white p-4">
        <h2 class="mr-4 mb-2">Введите матрицу:</h2>
        <div v-if="nMatrix < 100 && mMatrix < 100" class="flex flex-col overflow-scroll">
          <div v-for="(_, ind) in mMatrix" :key="ind" class="flex max-w-full">
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

      <section
        v-show="nMatrix > 0 && mMatrix > 0"
        class="my-4 flex items-center justify-center rounded-md bg-white p-4"
      >
        <h2 class="mr-4">Выберите метод:</h2>
        <select
          v-model="method"
          class="hidden-arrows appearance-none rounded-md border-none bg-gray-100 p-1 text-center text-lg"
        >
          <option value="">Выберите метод</option>
          <option value="sum">Сумма</option>
          <option value="savage">Критерий Сэвиджа</option>
          <option value="hurwitz">Критерий Гурвица</option>
          <option value="waldMaxMax">Критерий Вальда (максимакс)</option>
          <option value="waldMaxMin">Критерий Вальда (максимин)</option>
          <option value="laplaceRisks">Критерий Лапласа относительно рисков</option>
          <option value="laplaceWin">Критерий Лапласа относительно выигрышей</option>
        </select>
      </section>

      <section v-if="method === 'hurwitz'">
        <div class="my-4 flex items-center justify-center rounded-md bg-white p-4">
          <h2 class="mr-4">Введите альфа:</h2>
          <input
            v-model="hurwitzAlpha"
            type="number"
            max="99"
            maxlength="2"
            pattern="[0-9.]+"
            class="hidden-arrows w-[60px] appearance-none rounded-md border-none bg-gray-100 p-1 text-center text-lg"
          />
        </div>
      </section>

      <section
        v-show="nMatrix > 0 && mMatrix > 0"
        class="my-4 flex items-center justify-center rounded-md bg-white p-4"
      >
        <button
          class="cursor-pointer rounded border-none bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
          :disabled="isProcessing"
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

      <section v-show="isProcessing" class="my-4 flex items-center justify-center rounded-md bg-white p-4">
        <ProgressSpinner style="width: 60px; height: 60px" stroke-width="8" />
      </section>

      <section v-show="isSolved && !isProcessing" class="my-4 flex items-center justify-center rounded-md bg-white p-4">
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

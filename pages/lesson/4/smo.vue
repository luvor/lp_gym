<script setup>
import { ref } from 'vue'

const isFinished = ref(false)

const lambda = ref('')
const averageTime = ref('')

const flowRate = ref('')
const systemLoadFactor = ref('')
const relativeThroughput = ref('')
const absoluteBandwidth = ref('')
const failureProbability = ref('')

const setLambda = (value) => {
  lambda.value = value
}

const setAverageTime = (value) => {
  averageTime.value = value
}

const flowRateFunc = (time) => {
  return 1 / Number(time)
}

const systemLoadFactorFunc = (lambdaValue, flowRate) => {
  return Number(lambdaValue) / Number(flowRate)
}

const relativeThroughputFunc = (flowRate, lambdaValue) => {
  return Number(flowRate) / (Number(flowRate) + Number(lambdaValue))
}

const absoluteBandwidthFunc = (lambdaValue, relativeThroughput) => {
  return Number(lambdaValue) * Number(relativeThroughput)
}

const failureProbabilityFunc = (relativeThroughput) => {
  return 1 - Number(relativeThroughput)
}

const makeRound = (value) => {
  return Number(value).toFixed(2)
}

const handleCalculate = () => {
  flowRate.value = flowRateFunc(averageTime.value)
  systemLoadFactor.value = systemLoadFactorFunc(lambda.value, flowRate.value)
  relativeThroughput.value = relativeThroughputFunc(flowRate.value, lambda.value)
  absoluteBandwidth.value = absoluteBandwidthFunc(lambda.value, relativeThroughput.value)
  failureProbability.value = failureProbabilityFunc(relativeThroughput.value)

  isFinished.value = true
}
</script>

<template>
  <div class="mx-auto mt-10 max-w-screen-sm rounded-md bg-gray-50 p-4">
    <div class="flex flex-col items-start justify-center p-6">
      <div class="flex items-center justify-center">
        <label class="p-3 font-bold" for="oat">Интенсивность поступления заявок (в час)</label>
        <input
          id="lambda"
          class="max-w-[100px] rounded-md border-2 p-0 px-1 text-lg"
          type="text"
          name="oat"
          :value="lambda"
          @change="(e) => setLambda(e.target.value)"
        />
      </div>
      <div class="mr-2 flex items-center justify-center">
        <label class="p-3 font-bold" for="fuel">Средняя продолжительность обслуживания</label>
        <input
          id="time"
          class="max-w-[100px] rounded-md border-2 p-0 px-1 text-lg"
          type="text"
          name="fuel"
          :value="averageTime"
          @change="(e) => setAverageTime(e.target.value)"
        />
      </div>
    </div>
    <div class="flex items-center justify-center p-6">
      <button
        class="decoration-none m-2 block rounded-md border-2 border-blue-500 bg-blue-500 px-6 py-2 font-bold text-white hover:bg-white hover:text-blue-500"
        @click="handleCalculate"
      >
        Посчитать
      </button>
    </div>
    <div v-show="isFinished" class="m-3 flex flex-col items-start justify-center gap-3 p-6">
      <p>Интенсивность потока обслуживания = {{ makeRound(flowRate) }}</p>
      <p>Коэффициент загрузки системы = {{ makeRound(systemLoadFactor) }}</p>
      <p>Относительная пропускная способность = {{ makeRound(relativeThroughput) }}</p>
      <p>Абсолютная пропускная способность равна = {{ makeRound(absoluteBandwidth) }}</p>
      <p>Вероятность отказа равна = {{ makeRound(failureProbability) }}</p>
    </div>
  </div>
</template>

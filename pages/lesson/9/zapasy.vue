<script lang="ts" setup>
import { ref } from 'vue'
import { ReserveManagementMethods } from '~~/enums'

const intensity = ref('')
const intensityEconomic = ref('')
const storageCosts = ref('')
const realizationCosts = ref('')
const orderTime = ref('')
const orderDeliverTime = ref('')
const productCost = ref('')

const isFinished = ref(false)
const solution = ref('')

const method = ref('')

const handleSubmit = (e: Event) => {
  e.preventDefault()
  console.log('submit')

  const lambda = Number(intensityEconomic.value) // λ
  const v = Number(intensity.value) // v
  const s = Number(storageCosts.value) // s
  const k = Number(realizationCosts.value) // K
  const t = Number(orderTime.value) // t
  const dt = Number(orderDeliverTime.value) // T
  const c = Number(productCost.value) // c

  // Willson model
  // Q
  const q = Math.sqrt((2 * k * v) / s)
  // L
  let l
  if (method.value === ReserveManagementMethods.willson) {
    l = k * (v / q) + s * (q / 2)
  }
  if (method.value === ReserveManagementMethods.economic) {
    l = k * (v / q) + s * (((q * (lambda - v)) / 2) * lambda)
  }
  if (method.value === ReserveManagementMethods.withSales) {
    l = k * (v / q) + s * (q / 2) + c * v
  }
  // t(тау)
  const tay = (q / v) * t
  // h0
  const h = (v / t) * dt

  if (l) {
    solution.value = `<b>Размер заказа (Q):</b> ${q.toFixed(2)} <br><br>
    <b>Общие затраты на резервирование (L):</b> ${l.toFixed(2)} <br><br>
      <b>Время начала работы (t(тау)):</b> ${tay.toFixed(2)} <br><br>
        <b>Точка заказа(h0):</b> ${h.toFixed(2)}`
  }

  // solution.value.push(q.toFixed(2))
  // solution.value.push(l.toFixed(2))
  // solution.value.push(tay.toFixed(2))
  // solution.value.push(h.toFixed(2))

  //  = [
  //   q.toFixed(2),
  //   l.toFixed(2),
  //   tay.toFixed(2),
  //   h.toFixed(2)
  // ]

  isFinished.value = true
}
</script>
<template>
  <div class="mx-auto max-w-screen-sm rounded-md bg-gray-50 p-4">
    <form class="flex flex-col items-start justify-center p-6" @submit="handleSubmit">
      <div class="flex items-center">
        <p class="mr-4 p-3 font-bold">Выберите метод:</p>
        <select
          v-model="method"
          class="hidden-arrows appearance-none rounded-md border-none bg-gray-100 p-1 text-center text-lg"
        >
          <option value="">Выберите метод</option>
          <option value="willson">метод Уилсона</option>
          <option value="economic">экономический метод</option>
          <option value="withSales">метод учитывающий скидки</option>
        </select>
      </div>
      <div v-if="method === ReserveManagementMethods.economic" class="flex items-center">
        <label class="p-3 font-bold" for="intensityEconomic">Интенсивность производства продукции (λ)</label>
        <input
          id="intensityEconomic"
          v-model="intensityEconomic"
          class="max-w-[100px] rounded-md border-2 p-0 px-1 text-lg"
          type="text"
        />
      </div>
      <div v-if="method === ReserveManagementMethods.withSales" class="flex items-center">
        <label class="p-3 font-bold" for="productCost">Цена товара (c)</label>
        <input
          id="productCost"
          v-model="productCost"
          class="max-w-[100px] rounded-md border-2 p-0 px-1 text-lg"
          type="text"
        />
      </div>
      <div class="flex items-center">
        <label class="p-3 font-bold" for="intensity">Интенсивность (v)</label>
        <input
          id="intensity"
          v-model="intensity"
          class="max-w-[100px] rounded-md border-2 p-0 px-1 text-lg"
          type="text"
        />
      </div>
      <div class="flex items-center">
        <label class="p-3 font-bold" for="storageCosts">Затраты на хранение запаса (s)</label>
        <input
          id="storageCosts"
          v-model="storageCosts"
          class="max-w-[100px] rounded-md border-2 p-0 px-1 text-lg"
          type="text"
        />
      </div>
      <div class="flex items-center">
        <label class="p-3 font-bold" for="realizationCosts">Затраты на осуществление заказа (K)</label>
        <input
          id="realizationCosts"
          v-model="realizationCosts"
          class="max-w-[100px] rounded-md border-2 p-0 px-1 text-lg"
          type="text"
        />
      </div>
      <div class="flex items-center">
        <label class="p-3 font-bold" for="orderTime">Время доставки заказа между поставками (t)</label>
        <input
          id="orderTime"
          v-model="orderTime"
          class="max-w-[100px] rounded-md border-2 p-0 px-1 text-lg"
          type="text"
        />
      </div>
      <div class="flex items-center">
        <label class="p-3 font-bold" for="orderDeliverTime">Время доставки заказа от поставщика</label>
        <input
          id="orderDeliverTime"
          v-model="orderDeliverTime"
          class="max-w-[100px] rounded-md border-2 p-0 px-1 text-lg"
          type="text"
        />
      </div>
      <div class="flex items-center justify-center p-4">
        <button
          class="decoration-none block cursor-pointer rounded-md border-2 border-blue-500 bg-blue-500 px-6 py-2 font-bold text-white hover:bg-white hover:text-blue-500"
          type="submit"
        >
          Рассчитать
        </button>
      </div>
    </form>
    <div v-show="isFinished" class="m-3 flex flex-col items-start justify-center gap-3 p-6">
      <div class="h-0 w-full border-t-2 border-dotted border-gray-200"></div>
      <div v-html="solution" />
    </div>
  </div>
</template>

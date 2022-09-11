<script lang="ts" setup>
import { useMainStore } from '~~/stores/mainStore'

const store = useMainStore()
</script>
<template>
  <div class="h-screen bg-gray-100 p-8">
    <div class="mx-auto flex max-w-screen-sm flex-col items-center justify-center rounded-md bg-white p-4">
      <h1>Hello mthfk!</h1>
      <p>Count: {{ store.count }}</p>
      <p>Double count: {{ store.doubleCount }}</p>
      <button class="bg-red my-2 cursor-pointer rounded-md border-none px-6 py-2 text-white" @click="store.increment">
        +
      </button>
    </div>
  </div>
</template>

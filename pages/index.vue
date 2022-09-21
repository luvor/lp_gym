<script lang="ts" setup>
// import { useMainStore } from '~~/stores/mainStore'

// const store = useMainStore()
</script>
<template>
  <div class="min-h-screen bg-gray-100 p-8">
    <div class="mx-auto flex max-w-screen-sm flex-col items-center justify-center rounded-md bg-white p-4">
      <h1>Содержание</h1>
      <section class="flex w-full flex-col items-start justify-start p-4">
        <h2>Занятие 2</h2>
        <ul class="list-circle ml-4 flex flex-col">
          <li>
            <nuxt-link to="/lesson/2/savage">Критерий Сэвиджа</nuxt-link>
          </li>
        </ul>
      </section>
      <!-- <p>Count: {{ store.count }}</p>
      <p>Double count: {{ store.doubleCount }}</p>
      <button class="bg-red my-2 cursor-pointer rounded-md border-none px-6 py-2 text-white" @click="store.increment">
        +
      </button> -->
    </div>
  </div>
</template>

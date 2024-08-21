<script setup lang="ts">
import ArrowRightIcon from '../../../icons/ArrowRightIcon.vue';
import ArrowLeftIcon from '../../../icons/ArrowLeftIcon.vue';

interface Props {
  page: number;
  isFirstPage?: boolean;
  hasMoreData: boolean;
}
defineProps<Props>();
</script>

<template>
  <div class="flex justify-center py-10 space-x-2 bg-gray-100">
    <button
      :disabled="isFirstPage"
      @click="$router.push({ query: { page: page - 1 } })"
      class="flex item-center space-x-1.5 disabled:bg-gray-200 text-white bg-blue-500 rounded-md px-5 py-2 hover:bg-blue-700 transition-all"
    >
      <ArrowLeftIcon />
      <span class="p-0 m-0">Anteriores</span>
    </button>
    <button
      :disabled="hasMoreData"
      @click="$router.push({ query: { page: page + 1 } })"
      class="flex item-center space-x-1.5 disabled:bg-gray-200 bg-blue-500 rounded-md px-5 py-2 text-white hover:bg-blue-700 transition-all"
    >
      <span class="p-0 m-0">Siguientes</span>
      <ArrowRightIcon />
    </button>
  </div>
</template>

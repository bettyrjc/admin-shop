<template>
  <div class="px-5 py-2 bg-white rounded">
    <h1 class="text-3xl">Products</h1>
    <!-- component -->
    <div class="w-full py-8">
      <div class="overflow-hidden border-b border-gray-200 rounded shadow">
        <table class="min-w-full bg-white">
          <thead class="text-white bg-gray-800">
            <tr>
              <th class="w-10 px-4 py-3 text-sm font-semibold text-left uppercase">Image</th>
              <th class="px-4 py-3 text-sm font-semibold text-left uppercase">Title</th>
              <th class="px-4 py-3 text-sm font-semibold text-left uppercase">Price</th>
              <th class="px-4 py-3 text-sm font-semibold text-left uppercase">Sizes</th>
            </tr>
          </thead>
          <tbody class="text-gray-700">
            <tr
              v-for="(product, index) in products"
              :key="product.id"
              :class="{
                'bg-gray-100': index % 2 === 0,
              }"
            >
              <td class="w-10 px-4 py-3 text-left">
                <img :src="product.images[0]" alt="product.title" class="object-cover w-10 h-10" />
              </td>
              <td class="px-4 py-3 text-left">
                <router-link
                  :to="`/admin/products/${product.id}`"
                  class="hover:text-blue-500 hover:underline"
                >
                  {{ product.title }}
                </router-link>
              </td>
              <td class="px-4 py-3 text-left">
                <span class="px-3 py-1 text-xs text-blue-600 bg-blue-200 rounded-full">{{
                  product.price
                }}</span>
              </td>
              <td class="px-4 py-3 text-left">
                {{ product.sizes.join(', ') }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <ButtonPagination :page="page" :has-more-data="!!products && products.length < 10" />
    </div>
  </div>
</template>

<script setup lang="ts">
import ButtonPagination from '@/modules/common/components/ButtonPagination.vue';
import { getProductsAction } from '@/modules/products/actions';

import { useQuery, useQueryClient } from '@tanstack/vue-query';
import { watchEffect } from 'vue';
import { usePagination } from '@/modules/common/composables/usePagination';

const { page } = usePagination();
const queryClient = useQueryClient();
const { data: products } = useQuery({
  queryKey: ['products', { page: page }],
  queryFn: () => getProductsAction(page.value),
});

watchEffect(() => {
  queryClient.prefetchQuery({
    queryKey: ['products', { page: page.value + 1 }],
    queryFn: () => getProductsAction(page.value + 1),
  });
});
</script>

<style scoped></style>

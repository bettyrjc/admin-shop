<template>
  <!-- <input :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" @blur="$emit('blur')" /> -->
  <div class="mb-4">
    <label :for="id" class="form-label">{{ name }}</label>
    <input
      :type="type"
      :id="id"
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement)?.value ?? '')"
      @blur="$emit('blur')"
      :class="[
        'form-control',
        {
          'border-red-500': error,
        },
      ]"
    />
    <span v-if="error" class="text-sm text-red-500">{{ error }}</span>
  </div>
</template>

<script setup lang="ts">
import type { InputTypeHTMLAttribute } from 'vue';

interface Props {
  modelValue?: string;
  error?: string;
  type?: InputTypeHTMLAttribute;
  name: string;
  id: string;
}
withDefaults(defineProps<Props>(), {
  type: 'text',
  error: '',
});
defineEmits(['update:modelValue', 'blur']);
</script>

<style scoped>
.form-label {
  @apply block text-gray-700 text-sm font-bold mb-2;
}

.form-control {
  @apply shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none;
}
</style>

<template>
  <!-- <input :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" @blur="$emit('blur')" /> -->
  <div class="mb-4">
    <label :for="id" class="form-label">{{ name }}</label>
    <textarea
      :id="id"
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement)?.value ?? '')"
      @blur="$emit('blur')"
      :class="[
        'w-full h-32 px-3 py-2 leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline',
        {
          'border-red-500': error,
        },
      ]"
    ></textarea>
    <span v-if="error" class="text-sm text-red-500">{{ error }}</span>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue?: string;
  error?: string;
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
</style>

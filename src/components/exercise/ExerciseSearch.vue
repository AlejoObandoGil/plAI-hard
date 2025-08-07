<template>
  <div class="mb-8 flex flex-col md:flex-row gap-4 items-center justify-center">
    <input
      :value="modelValue"
      @input="handleInput"
      type="text"
      :placeholder="placeholder"
      class="w-full md:w-1/2 px-6 py-3 border-2 border-primary rounded-2xl shadow focus:outline-none focus:ring-4 focus:ring-secondary text-lg transition bg-accent-card placeholder-muted"
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: string
  placeholder?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>

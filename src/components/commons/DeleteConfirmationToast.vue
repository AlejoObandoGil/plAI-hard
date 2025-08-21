<template>
  <div class="container">
    <span class="text-sm">{{
      message || '¿Estás seguro de que quieres eliminar este elemento?'
    }}</span>
    <div class="mt-2 flex gap-2">
      <button
        @click="onCancel"
        class="px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none"
      >
        {{ cancelText || 'Cancelar' }}
      </button>
      <button
        @click="onConfirm"
        class="px-3 py-1.5 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none"
      >
        {{ confirmText || 'Eliminar' }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'DeleteConfirmationToast',
  props: {
    message: {
      type: String,
      default: '',
    },
    confirmText: {
      type: String,
      default: 'Eliminar',
    },
    cancelText: {
      type: String,
      default: 'Cancelar',
    },
  },
  methods: {
    onConfirm() {
      this.$emit('confirm')
    },
    onCancel() {
      this.$emit('cancel')
    },
  },
})
</script>

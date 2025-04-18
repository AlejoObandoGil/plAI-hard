<template>
  <img :src="imageUrl" :alt="alt" class="w-full h-48 object-cover" />
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps<{
  images: string[]
  alt?: string
  intervalMs?: number // milisegundos entre imagenes
}>()

const currentIndex = ref(0)
const imageUrl = ref('')
let intervalId: number | null = null

const updateImage = () => {
  if (props.images.length === 0) return
  imageUrl.value = `${props.images[currentIndex.value]}`
}

onMounted(() => {
  updateImage()
  intervalId = window.setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % props.images.length
    updateImage()
  }, props.intervalMs || 1500)
})

onBeforeUnmount(() => {
  if (intervalId) clearInterval(intervalId)
})

watch(
  () => props.images,
  () => {
    currentIndex.value = 0
    updateImage()
  },
)
</script>

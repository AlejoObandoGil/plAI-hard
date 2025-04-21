<template>
  <form class="flex flex-col gap-4" @submit.prevent>
    <div class="flex gap-2">
      <button type="button" class="btn btn-ghost w-full" @click="resetFilters">
        Limpiar filtros
      </button>
    </div>
    <div>
      <label class="block mb-1 font-semibold text-primary">Nivel</label>
      <select v-model="filters.level" class="input-select">
        <option value="">Todos</option>
        <option v-for="lvl in levels" :key="lvl" :value="lvl">{{ lvl }}</option>
      </select>
    </div>
    <div>
      <label class="block mb-1 font-semibold text-primary">Fuerza</label>
      <select v-model="filters.force" class="input-select">
        <option value="">Todas</option>
        <option v-for="f in forces" :key="f" :value="f">{{ f }}</option>
      </select>
    </div>
    <div>
      <label class="block mb-1 font-semibold text-primary">Mecánica</label>
      <select v-model="filters.mechanic" class="input-select">
        <option value="">Todas</option>
        <option v-for="m in mechanics" :key="m" :value="m">{{ m }}</option>
      </select>
    </div>
    <div>
      <label class="block mb-1 font-semibold text-primary">Equipamiento</label>
      <select v-model="filters.equipment" class="input-select">
        <option value="">Todos</option>
        <option v-for="eq in equipment" :key="eq" :value="eq">{{ eq }}</option>
      </select>
    </div>
    <div>
      <label class="block mb-1 font-semibold text-primary">Categoría</label>
      <select v-model="filters.category" class="input-select">
        <option value="">Todas</option>
        <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
      </select>
    </div>
    <div>
      <label class="block mb-1 font-semibold text-primary">Músculos principales</label>
      <div class="flex flex-wrap gap-2">
        <label v-for="muscle in muscles" :key="muscle" class="flex items-center gap-1 text-primary">
          <input
            type="checkbox"
            :value="muscle"
            v-model="filters.primaryMuscles"
            class="input-checkbox"
          />
          <span>{{ muscle }}</span>
        </label>
      </div>
    </div>
    <div>
      <label class="block mb-1 font-semibold text-primary">Músculos secundarios</label>
      <div class="flex flex-wrap gap-2">
        <label
          v-for="muscle in muscles"
          :key="muscle + '-sec'"
          class="flex items-center gap-1 text-primary"
        >
          <input
            type="checkbox"
            :value="muscle"
            v-model="filters.secondaryMuscles"
            class="input-checkbox"
          />
          <span>{{ muscle }}</span>
        </label>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import { filters } from '../../stores/exercises'
import { ref, onMounted } from 'vue'
import { supabase } from '../../services/supabase'

const levels = ref<string[]>([])
const forces = ref<string[]>([])
const mechanics = ref<string[]>([])
const equipment = ref<string[]>([])
const categories = ref<string[]>([])
const muscles = ref<string[]>([])

onMounted(async () => {
  // Cargar opciones de filtros desde la BD
  const [levelsData, forcesData, mechanicsData, equipmentData, categoriesData, musclesData] =
    await Promise.all([
      supabase.from('levels').select('name'),
      supabase.from('forces').select('name'),
      supabase.from('mechanics').select('name'),
      supabase.from('equipment').select('name'),
      supabase.from('categories').select('name'),
      supabase.from('muscles').select('name'),
    ])
  levels.value = (levelsData.data || []).map((l) => l.name)
  forces.value = (forcesData.data || []).map((f) => f.name)
  mechanics.value = (mechanicsData.data || []).map((m) => m.name)
  equipment.value = (equipmentData.data || []).map((e) => e.name)
  categories.value = (categoriesData.data || []).map((c) => c.name)
  muscles.value = (musclesData.data || []).map((m) => m.name)
})

function resetFilters() {
  filters.level = null
  filters.force = null
  filters.mechanic = null
  filters.equipment = null
  filters.category = null
  filters.primaryMuscles = []
  filters.secondaryMuscles = []
  // Emitir evento para que el padre cierre el drawer/modal si aplica
  emit('reset')
}

const emit = defineEmits(['reset'])
</script>

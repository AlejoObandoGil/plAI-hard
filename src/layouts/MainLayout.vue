<template>
  <div class="min-h-screen flex flex-col">
    <HeaderMobile @open-sidebar="isMobileSidebarOpen = true" />
    <HeaderDesktop>
      <template #profile-dropdown>
        <ProfileDropdown :open="isProfileOpen" @toggle="isProfileOpen = !isProfileOpen" />
      </template>
    </HeaderDesktop>
    <SidebarMovil v-model="isMobileSidebarOpen" />
    <main class="flex-1 px-4 pb-20 md:pb-4">
      <slot></slot>
    </main>
    <MobileNavigation />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import HeaderMobile from '@/components/layout/HeaderMobile.vue'
import HeaderDesktop from '@/components/layout/HeaderDesktop.vue'
import SidebarMovil from '@/components/layout/SidebarMovil.vue'
import MobileNavigation from '@/components/layout/MobileNavigation.vue'
import ProfileDropdown from '@/components/layout/ProfileDropdown.vue'

const isProfileOpen = ref(false)
const isMobileSidebarOpen = ref(false)
</script>

<style scoped>
@keyframes slide-in-right {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
.animate-slide-in-right {
  animation: slide-in-right 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.router-link-active {
  @apply text-secondary;
}
</style>

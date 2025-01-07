// components/layout/BaseLayout.vue
<script setup lang="ts">
import TopHeader from './TopHeader.vue'
import SideMenu from './SideMenu.vue'

defineProps<{
  defaultActiveMenu?: string
}>()
</script>

<template>
  <div class="h-screen flex flex-col">
    <TopHeader />
    
    <div class="flex flex-1">
      <SideMenu :default-active="defaultActiveMenu" />
      <main class="flex-1 bg-white">
        <slot></slot>
      </main>
    </div>
  </div>
</template>
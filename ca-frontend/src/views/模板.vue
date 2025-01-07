// views/Template.vue
<script setup lang="ts">
import BaseLayout from '@/components/layout/BaseLayout.vue'
</script>

<template>
  <BaseLayout default-active="database">
    <router-view />
  </BaseLayout>
</template>
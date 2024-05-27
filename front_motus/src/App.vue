<script setup lang="ts">
import { RouterView } from 'vue-router'
import TheHeader from './layout/TheHeader.vue'
</script>

<template>
  <TheHeader class="w-full" />
  <RouterView />
</template>

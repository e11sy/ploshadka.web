<template>
  <Header />
  <RouterView :class="$style['app']"/>
</template>

<script setup lang="ts">
import { Header, Popover } from '@/presentation/components';
import 'leaflet/dist/leaflet.css';
</script>

<style module>
@import './style/typography.pcss';
.app {
  background-color: #F5F5F5;
  height: 100%;
}
</style>

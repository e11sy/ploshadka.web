<template>
  <div :class="$style['courts']">
    <div :class="$style['courts__events-layout']">
      <Button
        content="создать событие"
        color="white"
        :class="$style['courts__create-event']"
        @click="() => $router.push('create-event')"
      />
      <div :class="$style['courts__events']">
        <ContextMenu
          :show-search="true"
          :items='contextMenuItems'
        />

      </div>
    </div>
    <div id="map" ref="mapElement" :class="$style['courts__map']" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useMap } from '@/application/services/useMap';
import { Button, ContextMenu } from '@/presentation/components';
import { ContextMenuItem } from '../components/ContextMenu';

const contextMenuItems: ContextMenuItem[] = [
  {
    type: 'default',
    title: 'Header',
    // eslint-disable-next-line no-console
    onActivate: console.log,
  },
  {
    title: 'Header 1',
    icon: 'H1',
    // eslint-disable-next-line no-console
    onActivate: console.log,
  }
]

const { initializeMap } = useMap()
const mapElement = ref<HTMLElement>();

onMounted(() => {
  if (mapElement.value) {
    initializeMap(mapElement.value);
  }
  // console.log('map element', mapElement.value);
});

</script>

<style module lang="postcss">
.courts {
  display: grid;
  grid-template-columns: 1fr 3fr;

  &__events-layout {
    display: flex;
    flex-direction: column;
    background-color: #FFFFFF;
  }

  &__events {
    margin-top: 16px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 0 16px;
  }

  &__create-event {
    margin: 20px auto 0;
    border: 1px solid #1F1F1F;
    border-radius: 28px;
    background-color: #FFFFFF;
  }

  &__map {
    height: calc(100% - 82px);
    width: 100%;
  }
}
</style>

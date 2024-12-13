<template>
  <div :class="$style['events']">
    <div :class="$style['events__header']">
      <Select
        :items="selectItems"
      />
      <div :class="$style['events__header-city']">
        Санкт-Петербург
      </div>
    </div>
    <div :class="$style['events__list']">
      <EventCard
        v-for="event in events"
        :key="event.id"
        :event="event"
      />
    </div>

    <Popover />
  </div>
</template>

<script setup lang="ts">
import { useEvents } from '@/application/services/useEvents';
import { onMounted } from 'vue';
import { EventCard, Select } from '@/presentation/components';
import Popover from '../components/Popover';

const { events, updateEventsBySport } = useEvents();

const selectItems = [{
  title: 'футбол',
  onActivate: () => updateEventsBySport('футбол'),
}, {
  title: 'баскетбол',
  onActivate: () => updateEventsBySport('баскетбол'),
}, {
  title: 'теннис',
  onActivate: () => updateEventsBySport('теннис'),
}, {
  title: 'хоккей',
  onActivate: () => updateEventsBySport('хоккей'),
}, {
  title: 'волейбол',
  onActivate: () => updateEventsBySport('волейбол'),
}];

onMounted(() => {
  if (events.value.length === 0) {
    updateEventsBySport('футбол');
  }
});
</script>

<style module lang="postcss">
.events {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  background-color: #F5F5F5;

  &__header {
    padding: 24px 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__list {
    margin: 0 auto;
    display: grid;
    gap: 60px;
    max-width: calc(100% - 200px);
    grid-template-columns: repeat(auto-fit, minmax(370px, 1fr));
    flex-wrap: wrap;
    justify-content: center;
    gap: 16px;
    padding: 0 16px;
  }
}
</style>

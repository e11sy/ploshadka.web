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
        :buttonIsActive="!!event.isParticipating"
        :displayParticipation="((!!user) && (event.peopleCount < event.peopleLimit)) || (event.isParticipating === true)"
        :onActivated="async () => changeParticipationStatus(event.id)"
        :event="event"
      />
    </div>
  </div>

</template>

<script setup lang="ts">
import { useEvents } from '@/application/services/useEvents';
import { onMounted, ref, watch } from 'vue';
import { EventCard, Select } from '@/presentation/components';
import { useAppState } from '@/application/services/useAppState';

const { user } = useAppState();
const { events, updateEventsBySport, changeParticipationStatus } = useEvents();

const selectedSport = ref<'футбол' | 'баскетбол' | 'теннис' | 'хоккей' | 'волейбол' | undefined>(undefined);

/**
 * Watch on user value changes and update events by court ids
 * This is need to update events participation status when user is authorized
 */
watch(() => user.value, () => {
  updateEventsBySport(selectedSport.value ?? '');
})

watch(() => selectedSport.value, () => {
  updateEventsBySport(selectedSport.value ?? '');
})


const selectItems = [{
  title: 'футбол',
  onActivate: () => selectedSport.value = 'футбол',
}, {
  title: 'баскетбол',
  onActivate: () => selectedSport.value = 'баскетбол',
}, {
  title: 'теннис',
  onActivate: () => selectedSport.value = 'теннис',
}, {
  title: 'хоккей',
  onActivate: () => selectedSport.value = 'хоккей',
}, {
  title: 'волейбол',
  onActivate: () => selectedSport.value = 'волейбол',
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

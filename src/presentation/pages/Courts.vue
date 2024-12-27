<template>
  <div :class="$style['courts']">
    <div :class="$style['courts__events-layout']">
      <Button
        v-if="user"
        content="создать событие"
        color="white"
        :class="$style['courts__create-event']"
        @click="() => $router.push('create-event')"
      />
      <div :class="$style['courts__events']">
        <Input
          placeholder="Поиск по адресу"
          v-model="search"
          @click="togglePopover($event.target.parentElement, { vertically: 'below', horizontally: 'left' })"
          @input="togglePopover($event.target.parentElement, { vertically: 'below', horizontally: 'left' })"
          @blur="hide"
        />
        <div :class="$style['courts__events-list']">
          <EventCard
            v-for="event in events"
            :key="event.id"
            :onActivated="async () => changeParticipationStatus(event.id)"
            :buttonIsActive="!!event.isParticipating"
            :event="event"
            :displayParticipation="((!!user) && (event.peopleCount < event.peopleLimit)) || (event.isParticipating === true)"
          />
        </div>
      </div>
    </div>
    <div id="map" ref="mapElement" :class="$style['courts__map']" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, toRaw } from 'vue';
import { useMap } from '@/application/services/useMap';
import { Button, ContextMenu, Input } from '@/presentation/components';
import { ContextMenuItem } from '../components/ContextMenu';
import { useCourts } from '@/application/services/useCourts';
import { useAppState } from '@/application/services/useAppState';
import { PopoverShowParams, usePopover } from '../components/Popover';
import { EventCard } from '@/presentation/components';
import { useEvents } from '@/application/services/useEvents';
import Court from '@/domain/entities/Court';

const { initializeMap, createCourtMarker, removeAllMarkers } = useMap();
const { user } = useAppState();
const { showPopover, hide, isOpen } = usePopover();
const { updateEventsByCourtIds, events, changeParticipationStatus } = useEvents();
const { currentlyDisplayedCourts, updateCourtsByLocation } = useCourts();

const mapElement = ref<HTMLElement>();

const search = ref('');

/**
 * Watch on search value changes and update courts by location
 */
watch(() => search.value, () => {
  updateCourtsByLocation(search.value);
});

/**
 * Watch on user value changes and update events by court ids
 * This is need to update events participation status when user is authorized
 */
watch(() => user.value, () => {
  updateEventsByCourtIds(toRaw(currentlyDisplayedCourts.value).map((court) => court.id));
})

/**
 * Watch on currentlyDisplayedCourts value changes and update markers on the map and event list
 */
watch(() => currentlyDisplayedCourts.value, async () => {
  removeAllMarkers();

  toRaw(currentlyDisplayedCourts.value).forEach((court) => {
    createCourtMarker(court);
  })

  const courtIds: Court['id'][] = [];

  toRaw(currentlyDisplayedCourts.value).forEach((court) => {
    courtIds.push(court.id);
  })

  await updateEventsByCourtIds(courtIds);
});

const togglePopover = (el: HTMLElement, align: PopoverShowParams['align']) => {
  if (isOpen.value) {
    hide();
  }

  const contextMenuItems: ContextMenuItem[] = toRaw(currentlyDisplayedCourts.value).map((court) => ({
    title: court.name,
    onActivate: () => {
      search.value = court.name;
      updateCourtsByLocation(court.name);
      hide();
    },
  }));

  showPopover({
    targetEl: el,
    with: {
      component: ContextMenu,
      props: {
        showSearch: false,
        items: contextMenuItems,
      },
    },
    align,
    width: 'fit-target',
  });
}

onMounted(() => {
  if (mapElement.value) {
    initializeMap(mapElement.value);
  }
});

</script>

<style module lang="postcss">
.courts {
  display: grid;
  grid-template-columns: 1fr 2fr;

  &__events-layout {
    display: flex;
    flex-direction: column;
  }

  &__events::-webkit-scrollbar {
    display: none;
  }

  &__events {
    overflow-y: auto;
    height: 580px;
    margin-top: 16px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 0 16px;

    &-list {
      display: grid;
      gap: 20px;
      grid-template-columns: repeat(auto-fill, minmax(370px, 1fr));
    }
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

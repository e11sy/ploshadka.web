<template>
  <div :class="$style['create-event']">
    <div :class="$style['create-event__header']">
      <div :class="$style['create-event__header-text']">Создание События</div>
    </div>
    <div :class="$style['create-event__form']">
      <Input
        placeholder="Введите название события"
        v-model="eventName"
        :class="$style['create-event__form-name']"/>
      <Input
        placeholder="Введите адрес"
        v-model="searchAdress"
        @click="togglePopover($event.target.parentElement, { vertically: 'below', horizontally: 'left' })"
        @input="togglePopover($event.target.parentElement, { vertically: 'below', horizontally: 'left' })"
        @blur="hide"
      />
      <Select :items="selectItems" :class="$style['create-event__form-sport']" />
      <Input
        v-model="peopleLimitInput"
        @input="filterPeopleLimit"
        :placeholder="'Лимит участников'" :class="$style['create-event__form-people-limit']"
      />
      <Input :placeholder="'Описание'" :class="$style['create-event__form-description']" />
      <div
        v-if="currentValidationStatus !== ''"
        :class="$style['create-event__form-validation-status']"
      >
        {{ currentValidationStatus }}
      </div>
      <div
        v-if="currentAcceptStatus !== ''"
        :class="$style['create-event__form-accept-status']"
      >
        {{ currentAcceptStatus }}
      </div>
      <Button
        content="Создать событие"
        color="green"
        :class="$style['create-event__create-button']"
        @click="buttonClicked"
    ></Button>
    </div>
  </div>
</template>

<script setup lang="ts">

import { ContextMenu, Input, Select, Button } from '@/presentation/components';
import { ref, toRaw, watch } from 'vue';
import { PopoverShowParams, usePopover } from '../components/Popover';
import { useCourts } from '@/application/services/useCourts';
import { useEvents } from '@/application/services/useEvents';

const { currentlyDisplayedCourts, updateCourtsByLocation, allCourts } = useCourts();
const { showPopover, hide } = usePopover();
const { createEvent } = useEvents();

/**
 * Currnt validation status
 * It is true by default but will be set before event creation
 */
const currentValidationStatus = ref('');
const currentAcceptStatus = ref('');

const selectedSport = ref('');
const searchAdress = ref('');
const eventName = ref('');
const peopleLimitInput = ref('');

/**
 * Watch on search value changes and update courts by location
 */
watch(() => searchAdress.value, async () => {
  await updateCourtsByLocation(searchAdress.value);
});

const buttonClicked = () => {
  if (validate()) {
    const court = allCourts.value.filter((court) => {
      return court.name === searchAdress.value;
    })[0];

    currentAcceptStatus.value = 'Событие успешно создано';

    createEvent({
      name: eventName.value,
      courtId: court.id,
      sport: selectedSport.value,
      peopleLimit: Number(peopleLimitInput.value),
    });

    selectedSport.value = '';
    searchAdress.value = '';
    eventName.value = '';
    peopleLimitInput.value = '';
  }
}

const filterPeopleLimit = () => {
  peopleLimitInput.value = peopleLimitInput.value.replace(/\D/g, "");
}

/**
 * Method that validates the form
 */
const validate = () => {
  /**
   * Validate if the event name is entered
   */
  if (eventName.value.trimEnd() === '') {
    currentValidationStatus.value = 'Введите название события';
    return false;
  }

  let visited = false;
  /**
   * Validate if the address is in the list of currently displayed courts
   */
  for (const court of toRaw(allCourts.value)) {
    if (court.name === searchAdress.value) {
      visited = true
    }
  }

  if (!visited) {
      currentValidationStatus.value = 'Выберите адрес из списка';
      return false;
    }

  /**
   * Validate if the sport is selected
   */
  if (selectedSport.value === '') {
    currentValidationStatus.value = 'Выберите вид спорта';
    return false;
  }

  /**
   * Validate if the people limit is entered
   */
  if (peopleLimitInput.value === '') {
    currentValidationStatus.value = 'Введите лимит участников';
    return false;
  }

  currentValidationStatus.value = '';
  return true;
}

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

const togglePopover = (el: HTMLElement, align: PopoverShowParams['align']) => {
  const contextMenuItems = toRaw(currentlyDisplayedCourts.value).map((court) => ({
    title: court.name,
    onActivate: () => {
      searchAdress.value = court.name;
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
  });
};

</script>

<style module lang="postcss">
.create-event {
  display: grid;
  grid-template-rows: 2fr 4fr;

  &__header {
    margin-left: auto;
    margin-right: auto;
    margin-top: 50px;
    display: flex;
    align-items: center;
    justify-content: center;

    border: solid 1px #000000;
    width: 320px;
    height: 60px;
    border-radius: 56px;
    background-color: #f5f5f5;

    &-text {
      font-size: 24px;
      font-weight: 500;
      color: #1E1E1E;
    }
  }

  &__form {
    margin: 0 20%;
    display: grid;
    margin-bottom: auto;

    grid-template-areas:
      "name name name"
      "adress sport people-limit"
      "description description description"
      "validation-status validation-status validation-status";
    grid-template-columns: 2fr 1fr 1fr;

    gap: 28px;
    padding: 0 16px;

    &-name {
      grid-area: name;
    }

    &-adress {
      grid-area: adress;
    }

    &-sport {
      grid-area: sport;
    }

    &-peope-limit {
      grid-area: people-limit;
    }

    &-description {
      grid-area: description;
    }

    &-validation-status {
      grid-area: validation-status;
      color: #E0533D;
    }

    &-accept-status {
      grid-area: validation-status;
      color: #469B88;
    }
  }
}
</style>

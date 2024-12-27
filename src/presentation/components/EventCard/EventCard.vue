<template>
  <div :class="$style['event-card']">
    <div :class="$style['event-card__heading']">
      <h2 :class="$style['event-card__heading-location']">
        {{ event.court.name }}
      </h2>
      <p :class="$style['event-card__heading-sport']">
        {{ event.sport }}
      </p>
    </div>
    <div :class="$style['event-card__separator']"/>
    <div :class="$style['event-card__info-name']">
      {{ event.name }}
    </div>
    <div :class="$style['event-card__info-description']">
      {{ event.description }}
    </div>
    <div
      v-if="displayParticipation"
      :class="$style['event-card__footer']">
      <Button
        v-if="!buttonIsActive"
        color="green"
        content="Участвовать"
        @click="buttonClicked"
      />
      <Button
        v-else
        color="green"
        content="✅Вы участник"
        @click="buttonClicked"
      />
      <div :class="$style['event-card__footer-participants']">
        {{ event.peopleCount ?? 0 }}/{{ event.peopleLimit }} участников
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Event from '@/domain/entities/Event';
import Button from '../Button';
import { ref, watch } from 'vue';

const props = defineProps<{
  event: Event;
  buttonIsActive: boolean;
  onActivated: () => Promise<void>;
  displayParticipation: boolean;
}>();

watch(() => props.buttonIsActive, () => {
  buttonIsActive.value = props.buttonIsActive;
});

const buttonIsActive = ref(props.buttonIsActive);

const buttonClicked = async () => {
  await props.onActivated();
};

</script>

<style module lang="postcss">
.event-card {
  background-color: #FFFFFF;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  padding: 0 16px 16px 16px;

  &__heading {
    height: fit-content;
    display: flex;
    align-items: center;

    &-location {
      margin-right: auto;
      max-width: 300px;
      font-size: 16px;
      font-weight: bold;
    }

    &-sport {
      margin-left: auto;
      padding-left: 20px;
      font-size: 16px;
      font-weight: bold;
    }
  }

  &__separator {
    height: 1px;
    background-color: #E0E0E0;
  }

  &__info {
    &-name {
      word-break: break-all;
      font-size: 16px;
      font-weight: bold;
      margin-top: 16px;
    }

    &-description {
      margin: 10px 0 20px;
      word-break: break-all;
      font-size: 16px;
      font-weight: default;
    }
  }

  &__footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: auto;

    &-participants {
      margin-top: 8px;
      font-size: 16px;
      font-weight: bold;
    }
  }
}

</style>

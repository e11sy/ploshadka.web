<template>
  <div :class="[
    $style['btn'],
    $props.color !== 'black' && $style[`btn--${$props.color}`]]">
    <div v-if="$props.icon !== undefined">
      <Icon :name="$props.icon"/>
    </div>
    <div :class="$style['btn__content']">
      {{ $props.content }}
    </div>
  </div>
</template>

<script setup lang="ts">
import Icon from '../Icon';

withDefaults(
  defineProps<{
    icon?: string,
    content: string,
    color?: 'black' | 'white' | 'green',
  }>(), {
    color: 'black',
  }
);
</script>

<style module lang="postcss">

.btn {
  display: flex;
  cursor: pointer;
  border-radius: 8px;
  color: #FFFFFF;
  background-color: #1E1E1E;
  width: fit-content;
  height: 36px;

  &:hover {
    transition: background-color 0.3s;
    background-color: #1E1E1E;
    color: #FFFFFF;
  }

  &--white {
    background-color: #F5F5F5;
    color: #1E1E1E;
  }

  &--green {
    background-color: #358C29;
    color: #FFFFFF;
  }

  &__content {
    padding: 0 25px;
    display: flex;

    align-items: center;
    font-size: 16px;
  }
}

</style>

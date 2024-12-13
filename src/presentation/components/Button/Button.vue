<template>
  <div :class="[
    $style['btn'],
    $props.secondary && $style[`btn--secondary`]]">
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

defineProps<{
  icon?: string,
  content: string,
  secondary?: boolean,
}>();

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
    transition: color 0.3s;
    background-color: rgba(30, 30, 30, 1);
    color: #FFFFFF;
  }

  &--secondary {
    background-color: #F5F5F5;
    color: #1E1E1E;
  }

  &__content {
    padding: 0 25px;
    display: flex;

    align-items: center;
    font-size: 16px;
  }
}

</style>

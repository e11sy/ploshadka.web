<template>
  <div :class="[
    $style['container'],
    $style[`container--${props.align}`],
    props.size === 'large' ? $style[`container--large`]: ''
    ]">
    <Icon v-if="$props.icon !== undefined" :name="$props.icon" />
    <slot/>
  </div>
</template>

<script setup lang="ts">
import Icon from '../Icon/Icon.vue';

const props = withDefaults(defineProps<{
  icon?: string;
  align: 'center' | 'start' | 'end';
  size?: 'small' | 'large';
}>(), {
  size: 'small'
});

</script>

<style module lang="postcss">
.container {
  width: 100%;
  height: fit-content;
  background-color: #FFFFFF;
  border-radius: 19px;
  padding: 29px 26px;
  margin-top: 25px;
  font-size: 16px;
  gap: 20px;

  &--center {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &--start {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
  }

  &--end {
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
  }

  &--large {
    font-size: 24px;
  }
}
</style>

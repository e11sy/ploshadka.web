<template>
  <div :class="[$style['btn'], $style[`btn--${$props.size}`], $props.secondary && $style[`btn--secondary`]]">
    <div :class="$style['btn__content']">
      {{ $props.content }}
    </div>
  </div>
</template>

<script setup lang="ts">

defineProps<{
  content: string,
  size: 'medium' | 'large',
  secondary?: boolean,
}>();

</script>

<style module lang="postcss">

.btn {
  display: flex;
  cursor: pointer;
  border-radius: 80px;
  background-color: #FFFFFF;
  color: #5B5B5B;
  width: fit-content;
  
  &--secondary {
    background-color: #5B5B5B;
    color: #FFFFFF;
  }

  &__content {
    padding: 0 48px;
    display: flex;
    
    align-items: center;
    font-size: 22px;
  }

  &--medium {
    height: 60px;
  }

  &--large {
    height: 80px;
  }
}

</style>
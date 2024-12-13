<template>
  <div :class="[$style['card'], props.color === 'black' ? $style[`card--${props.color}`]: '']">
    <slot name="sub-header"/>
    <div :class="$style['card__title']">
      <slot name='title' />
    </div>
    <div :class="$style['card__subtle']">
      <slot name="subtle"/>
    </div>
    <div :class="$style['card__footer']">
      <slot name="footer"/>
    </div>
  </div>
</template>


<script setup lang="ts">

const props = withDefaults(defineProps<{
  color?: 'black' | 'white';
}>(), {
  color: 'white',
});

</script>

<style module lang="postcss">
.card {
  width: 100%;
  height: fit-content;
  margin-top: 25px;
  padding: 50px 0 30px;
  justify-content: center;
  align-items: center;
  background-color: #FFFFFF;
  color: #1E1E1E;
  border-radius: 19px;

  &--black {
    background-color: #1E1E1E;
    color: #FFFFFF;
  }

  &__title {
    padding-left: 27px;
    line-height: calc(48px + 14px);
    font-size: 48px;
  }

  &__subtle {
    padding: 25px 27px 0 27px;
    font-size: 16px;
    font-weight: bolder;
  }

  &__footer {
    padding: 25px 27px 0 27px;
  }
}
</style>

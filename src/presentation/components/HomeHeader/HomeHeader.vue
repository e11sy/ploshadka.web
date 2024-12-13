<template>
  <div :class="$style['header__subtle']">
    <div :class="$style['header__subtle-text']">Футбол</div>
    <div :class="$style['header__subtle-text']">Волейбол</div>
    <div :class="$style['header__subtle-text']">Теннис</div>
    <div :class="$style['header__subtle-text']">Хоккей</div>
    <div :class="$style['header__subtle-text']">Боулинг</div>
    <div :class="$style['header__subtle-text']">Другое</div>
  </div>
  <div :class="$style['header__title']">
    <b>ПРОВЕДИ СВОЙ<br/><div style="font-size: 96px; display: flex;"><div style="color: #358C29;">СПОРТ</div>-ДОСУГ</div></b>
  </div>

</template>

<script setup lang="ts"></script>

<style module lang="postcss">
.header {
  width: 80%;
  height: 80%;

  &__title {
    white-space: nowrap;
    overflow-wrap: normal; /* Для старых браузеров: word-wrap */
    word-break: keep-all;
    line-height: 1;
    padding-top: 20px;
    color: #242424;
    font-size: 64px;
  }

  &__subtle {
    padding-top: 140px;
    display: flex;
    gap: 2em;

    &-text {
      color: #9C9C9C;
      font-size: 20px;
    }
  }
}
</style>

<template>
  <div :class="$style['header']">
    <div :class="$style['header__content']">
      <Logo/>
      <div :class="$style['header__breadcrumbs']">
        <div :class="$style['header__breadcrumbs-text']">Площадки</div>
        <div :class="$style['header__breadcrumbs-text']">События</div>
        <div :class="$style['header__breadcrumbs-text']">О&nbsp;нас</div>
      </div>

      <div :class="$style['header__auth']">
        <Button
          v-if="user === null"
          content="Войти"
          size="medium"
          @click="showLoginPopup"
          />
        <Button
          v-if="user === null"
          content="Зарегистрироваться"
          size="medium"
          secondary
          @click="showLoginPopup"
          />

      </div>
      <div :class="$style['header__logout']">
        <Button
          v-if="user !== null"
          content="Выйти"
          size="medium"
          secondary
          @click="logout"
          />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Logo from './Logo.vue';
import Button from './Button.vue';
import useAuth from '@/application/services/useAuth';
import { useAppState } from '@/application/services/useAppState';

const { showGoogleAuthPopup } = useAuth();
const { user } = useAppState()
const { logout } = useAuth();

/**
 * Shows Google Authentication in a popup
 */
function showLoginPopup() {
  showGoogleAuthPopup();
}

</script>

<style module lang="postcss">
.header {
  display: flex;
  background-color: #202020;
  height: 94px;
  padding-top: 52px;
  padding-bottom: 52px;
  padding-left: 143px;

  &__content {
    display: flex;
    width: fit-content;
    align-items: center;
  }

  &__breadcrumbs {
    padding-left: 340px;
    display: flex;
    align-items: center;
    gap: 2em;

    &-text {
      color: #FFFFFF;
      font-size: 22px;
      letter-spacing: 2px;
    }
  }

  &__auth {
    display: flex;
    padding-left: 120px;
    gap: 26px;
  }

  &__logout {
    display: flex;
    padding-left: 260px;
  }
}

</style>

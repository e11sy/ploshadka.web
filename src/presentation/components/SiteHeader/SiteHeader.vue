<template>
  <div :class="$style['header']">
    <div :class="$style['header__content']">
      <Logo
        style="margin-right: auto; cursor: pointer;"
        @click="router.push('/')"
      />
      <div :class="$style['header__breadcrumbs']">
        <div
          :class="$style['header__breadcrumbs-text']"
          @click="router.push('/courts')"
          >Площадки</div>
        <div
          :class="$style['header__breadcrumbs-text']"
          @click="router.push('/events')"
          >События</div>
        <div
          :class="$style['header__breadcrumbs-text']"
          @click="router.push('/')"
          >О&nbsp;нас</div>
      </div>

      <div :class="$style['header__auth']"
        v-if="user === null">
        <Button
          content="Войти"
          color="white"
          @click="showLoginPopup"
          />
        <Button
          content="Зарегистрироваться"
          @click="showLoginPopup"
          />
      </div>
      <div
        v-else
        :class="$style['header__logout']">
        <Button
          content="Выйти"
          @click="logout"
          />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Logo from '../Logo';
import Button from '../Button';
import useAuth from '@/application/services/useAuth';
import { useAppState } from '@/application/services/useAppState';
import { useRouter } from 'vue-router';

const router = useRouter();

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
  background-color: #FFFFFF;
  height: 80px;
  padding: 0px 100px;
  font-weight: bold;
  border: #CBCBCB 1px, solid;

  &__content {
    display: flex;
    width: 100%;
    align-items: center;
  }

  &__breadcrumbs {
    cursor: pointer;
    margin: 0 auto;
    display: flex;
    align-items: center;
    gap: 2em;

    &-text {
      color: #1E1E1E;
      font-size: 16px;
      letter-spacing: 2px;
    }
  }

  &__auth {
    display: flex;
    margin-left: auto;
    min-width: 210px;
    gap: 26px;
  }

  &__logout {
    min-width: 210px;
    margin-left: auto;
  }
}

</style>

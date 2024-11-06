<template>
  <div :class="$style['layout']">
    <div :class="$style['content']">
      <div :class="$style['content__title']">
        <HomeHeader/>
      </div>
      <div :class="$style['content__subtle']">
        Площадка - простой сервис для организации<br/>мероприятий и поиска единомышленников
      </div>
      <Button
        content="Присоединяйтесь"
        size="large"
        secondary
        @click="showGoogleAuthPopup"
      />
    </div>
    <HomePreset/>
  </div>
</template>

<script setup lang="ts">
import { HomeHeader, Button, HomePreset } from '../components';
import useAuth from '@/application/services/useAuth';

const { showGoogleAuthPopup } = useAuth();
</script>

<style module>

.layout {
  width: 100%;
  height: 80vh;
  display: flex;
  flex-direction: row;
  background-color: #202020;
  border-radius: 0 0 50% 50% / 0 0 10% 10%;
  overflow-y: hidden;
}

.content {
  padding-left: 143px;

  &__title {
    padding: 52px 0;
  }

  &__subtle {
    -ms-transform-origin-x: 20px;
    color: #FFFFFF;
    font-size: 24px;
    line-height: 160%;
    padding-bottom: 90px;
  }
}
</style>

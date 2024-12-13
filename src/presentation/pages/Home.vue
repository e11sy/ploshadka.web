<template>
  <div :class="$style['home']">
    <div :class="$style['home__container']">
      <Container size="large" align='center'>
        <span>Площадка — бесплатный сервис для поиска и организации спортивного досуга.</span>
      </Container>
    </div>
    <div :class="$style['home__cards']">
      <Card
        subtle='Более 100 площадок по всей России, на которых прямо сейчас играют люди'
      >
        <template #title>
          <span>
            НАЙДИ, С КЕМ<br/><span style="font-size: 64px; color: #358C29">ПОИГРАТЬ</span>
          </span>
        </template>
        <template #subtle>
          <span>
            Более 100 площадок по всей России,<br/>на которых прямо сейчас играют люди
          </span>
        </template>
        <template #footer>
          <Button content='Площадки'/>
        </template>
      </Card>
      <Card
        color='black'
      >
        <template #title>
          <span>
            УЧИСЬ У ЛУЧШИХ —<br/><span style="font-size: 64px; word-break: keep-all; overflow-wrap: normal;"><span style="color: #358C29">СТАНЬ</span> ЛУЧШИМ</span>
          </span>
        </template>
        <template #subtle>
          <span>
            У нас только квалифицированные специалисты,<br/>имеющие реальные достижения в мире спорта
          </span>
        </template>
        <template #footer>
          <Button content='Записаться' secondary/>
        </template>
      </Card>
    </div>
    <div :class="$style['home__cards-description']">
      <Container
        icon="IconFlag"
        align="start"
      >
        <span>Необязательно быть профессионалам в мире спорта. Присоединяйся к любительским матчам или создавай собственные</span>
      </Container>
      <Container
        icon="IconCup"
        align="start"
        style="width: 100%;"
      >
        <span>Начать проще, чем кажется. Мы поможем с выбором тренера в твоём городе и поиском площадок</span>
      </Container>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Card, Button, Container } from '../components';
</script>

<style module lang="postcss">

.home {
  background-color: #F5F5F5;
  display: grid;
  height: calc(100% - 80px);
  width: calc(100% - 200px);
  padding: 0 100px;

  &__cards {
    width: 100%;
    display: flex;
    gap: 2em;
  }

  &__cards-description {
    display: flex;
    gap: 2em;
    margin-top: 50px;
  }

  &__container {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>

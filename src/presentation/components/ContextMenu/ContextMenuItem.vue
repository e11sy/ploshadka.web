<template>
  <div :class="$style['item']">
    <div
      v-if="item.type === 'default' || !item.type"
      :class="[$style['item__default']]"
    >
      <div
        :class="$style['item__body']"
        @click="item.onActivate"
      >
        <Icon
          v-if="item.icon !== undefined"
          :name="item.icon"
        />
        <div>
          {{ item.title }}
        </div>
      </div>
    </div>
    <div
      v-if="item.type === 'separator'"
      :class="$style['item__separator']"
    >
      <div :class="$style['item__line']" />
    </div>
    <div
      v-if="item.type === 'message'"
      :class="[$style['item__default'],
               $style['item__default--no-hover']]"
    >
      {{ item.message }}
    </div>
  </div>
</template>

<script setup lang="ts">
import Icon from '../Icon';
import type { ContextMenuItem } from './ContextMenu.types';

defineProps<{
  /**
   * Context menu item, can be default or separator
   */
  item: ContextMenuItem;
}>();
</script>

<style lang="postcss" module>
.item {
  &__separator {
    padding: 2px 4px;
  }

  &__line {
    align-self: stretch;
    background: #F5F5F5;
    height: 1px;
  }

  &__default {
    gap: 8px;
    border-radius: 8px;
    padding: 8px 8px;

    &--no-hover {
      cursor: default;
    }
  }

  .item__default:not(.item__default--no-hover):hover {
    background-color: #F5F5F5;
    cursor: pointer;
  }

  &__body {
    display: flex;
    align-items: center;
    min-height: 20px;
    gap: 8px;
  }
}
</style>

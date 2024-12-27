<template>
  <div
    v-show="isOpen"
    ref="popoverEl"
    :class="$style.popover"
    :style="{ width: width }"
  >
    <component
      :is="content.component"
      v-if="content"
      v-bind="content.props"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { usePopover } from './usePopover';
import { onClickOutside } from '@vueuse/core';

/**
 * Reference to the popover element
 * Used to bind click-outside event
 */
const popoverEl = ref<HTMLDivElement | null>(null);

const {
  isOpen,
  position,
  hide,
  content,
  width,
  targetElement,
} = usePopover();

/**
 * Close the popover when clicking outside of it
 */
onClickOutside(popoverEl, hide, {
  /**
   * Allow clicks on the target element to implemet toggle behavior
   */
  ignore: [targetElement],
});
</script>

<style module>
.popover {
  position: absolute;
  z-index: 3;
  background-color: #FFFFFF;
  border-radius: 8px;
  border: solid 1px;
  padding: 8px;
  left: v-bind('position.left');
  top: v-bind('position.top');
  transform: v-bind('position.transform');

  box-sizing: border-box;
}
</style>

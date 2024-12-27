<template>
  <Button
    :icon="activeItem.icon"
    :content="activeItem.title"
    @click="!isOpen ? togglePopover($event.currentTarget, {vertically: 'below', horizontally: 'left'}) : hide()"
  />
</template>
<script setup lang="ts">
import type { ContextMenuItem as Item } from '../ContextMenu/ContextMenu.types';
import ContextMenu from '../ContextMenu';
import { onMounted, ref } from 'vue';
import { usePopover, PopoverShowParams } from '../Popover';
import Button from '../Button';

const props = defineProps<{
  items: Item[];
}>();

const items = props.items;
const { showPopover, hide, isOpen } = usePopover();

const togglePopover = (el: HTMLElement, align: PopoverShowParams['align']) => {
  showPopover({
    targetEl: el,
    with: {
      component: ContextMenu,
      props: {
        showSearch: false,
        items: items,
      },
    },
    align,
  });
};

/* Default item value for select on page load */
const defaultValue: Item = {
  title: 'вид спорта',
  type: 'default',
  onActivate: () => {},
};
const activeItem = ref(defaultValue);

/* Main function to update selected item */
const updateActiveItem = (item: Item) => {
  if (item.type === 'default' || !item.type) {
    activeItem.value = Object.create(item);
    activeItem.value.onActivate = () => {};
    hide();
  }
};

onMounted(() => {
  items.forEach((item) => {
    if (item.type === 'default' || !item.type) {
      const originalOnActivate = item.onActivate;

      item.onActivate = () => {
        originalOnActivate();
        updateActiveItem(item);
      };
    }
  });
});

</script>

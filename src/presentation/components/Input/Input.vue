<template>
  <div
    :class="$style['input']"
    @click="focusInput"
  >
    <Icon
      v-if="icon"
      :name="icon"
    />
    <input
      ref="textInput"
      v-model="model"
      :class="[$style['input__editable-zone']]"
      :disabled="props.disabled"
      :placeholder="props.placeholder"
    >
  </div>
</template>

<script setup lang="ts">
import { onMounted, defineModel, ref } from 'vue';
import Icon from '../Icon';

const props = withDefaults(
  defineProps<{
    /**
     * The text to display on the input
     */
    value?: string;

    /**
     * Whether the input is disabled
     */
    disabled?: boolean;

    /**
     * Name of the input icon
     */
    icon?: string;

    /**
     * Text to be displayed in an empty field
     */
    placeholder?: string;
  }>(),
  {
    value: '',
    disabled: false,
    icon: undefined,
    placeholder: '',
  }
);

const model = defineModel<string>();

const textInput = ref<HTMLInputElement | null>(null);

const focusInput = () => {
  if (textInput.value) {
    textInput.value.focus();
  }
};

onMounted(() => {
  model.value = props.value;
});
</script>

<style module>
.input {
  display: flex;
  background-color: #FFFFFF;
  gap: 8px;
  align-items: center;
  width: 100%;
  cursor: text;
  box-sizing: border-box;
  color: #9C9C9C;

  &__editable-zone {
    flex: 1;
    border: 0;
    outline: 0;
    padding: 0;
    color: #1F1F1F;
    width: inherit;
    font-size: inherit;
    font-family: inherit;
    background-color: inherit;

    &[disabled] {
      color: #9C9C9C;
    }
  }

  padding: 8px 8px;
  border-radius: 8px;
}
</style>

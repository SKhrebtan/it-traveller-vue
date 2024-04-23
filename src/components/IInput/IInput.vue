<script setup>
import { defineProps, computed } from 'vue'
const props = defineProps({
  modelValue: String,
  label: String,
  placeholder: String,
  type: {
    default: 'text',
    type: String
  }
})
defineOptions({
  inheritAttrs: false
})
const emit = defineEmits(['update:modelValue'])
const isTextarea = computed(() => props.type === 'textarea')

const baseStyles =
  'w-full text-sm rounded-[4px] border-[#eaeaea] border-[1px] py-2 px-3 focus:outline-primary'

const inputStyles = computed(() => {
  return isTextarea.value ? baseStyles + ' resize-none' : baseStyles
})
const componentName = computed(() => {
  return isTextarea.value ? 'textarea' : 'input'
})
</script>

<template>
  <div class="w-full text-[#2c2c2c]">
    <label class="block">
      <span class="block text-xs px-3 mb-2"> {{ props.label }}</span>
      <component
        :is="componentName"
        rows="3"
        @input="emit('update:modelValue', $event.target.value)"
        :value="modelValue"
        v-bind="{ ...$props, ...$attrs }"
        :class="inputStyles"
      />
    </label>
  </div>
</template>

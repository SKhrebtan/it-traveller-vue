<script setup>
import { defineProps, computed } from 'vue'
import { RouterLink } from 'vue-router'
const props = defineProps({
  variant: {
    default: 'primary',
    type: String,
    validator: (value) => {
      return ['primary', 'gradient', 'outlined'].includes(value)
    }
  },
  to: String,
  isLoading: {
    default: false,
    type: Boolean
  }
})

const bgStyles = computed(() => {
  return props.variant === 'gradient'
    ? 'bg-gradient-to-r from-[#FFA279] to-[#F3743D]'
    : 'bg-[#FFA279]'
})

const componentName = computed(() => {
  return props.to ? RouterLink : 'button'
})

const isLink = computed(() => !!props.to)

const link = computed(() => {
  return isLink.value ? props.to : undefined
})
</script>

<template>
  <component
    :to="link"
    :is="componentName"
    :class="bgStyles"
    class="py-3 px-10 text-white font-bold -tracking-wider rounded-xl"
  >
    <!-- <div v-if="$slots.default">OK</div> -->
    <template v-if="props.isLoading"> Loading...</template>
    <template v-else> <slot>Почати роботу</slot></template>
  </component>
</template>

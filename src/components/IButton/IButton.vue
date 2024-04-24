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
  },
  isDisabled: {
    default: false,
    type: Boolean
  }
})

const bgStyles = computed(() => {
  console.log(props.isDisabled)
  if (props.isDisabled) return 'disabled:bg-zinc-500 cursor-not-allowed'
  if (props.variant === 'outlined') {
    return 'bg-white text-[#FFA279] border-[1px] border-[#FFA279]'
  }
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
    <template v-if="props.isLoading">Loading...</template>
    <template v-if="props.isDisabled">Choose place first</template>
    <template v-else><slot></slot></template>
  </component>
</template>

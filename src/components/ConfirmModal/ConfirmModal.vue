<script setup>
import IButton from '../IButton/IButton.vue'
import IModal from '../IModal/IModal.vue'
defineProps({
  title: {
    type: String,
    default: ''
  },
  isOpen: {
    type: Boolean,
    default: false
  },
  isLoading: {
    type: Boolean,
    default: false
  },
  hasError: {
    type: String,
    default: 'Something went wrong..'
  }
})

const emit = defineEmits(['cancel', 'confirm'])
</script>

<template>
  <IModal v-if="isOpen" @close="emit('cancel')">
    <div class="mb-4 text-lg w-[280px] modals:w-[400px]">
      {{ title }}
    </div>
    <div class="flex gap-3 justify-center">
      <IButton variant="outlined" @click="emit('cancel')">Cancel</IButton>
      <IButton
        variant="gradient"
        @click="emit('confirm')"
        :is-loading="isLoading"
        >Confirm
      </IButton>
    </div>
    <div v-if="hasError" class="text-red-500">{{ hasError }}</div>
  </IModal>
</template>

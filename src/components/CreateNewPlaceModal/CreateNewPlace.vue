<script setup>
import IModal from '../IModal/IModal.vue'
import IInput from '../IInput/IInput.vue'
import InputImage from '../InputImage/InputImage.vue'
import IButton from '../IButton/IButton.vue'
import MarkerIcon from '@/assets/imgs/MarkerIcon.vue'
import { reactive, computed } from 'vue'
const props = defineProps({
  isOpen: {
    default: false,
    type: Boolean
  },
  isLoading: {
    default: false,
    type: Boolean
  },
  hasError: {
    default: false,
    type: Boolean
  }
})
const formData = reactive({
  title: '',
  description: '',
  img: ''
})
const emit = defineEmits(['close', 'submit'])

const handleUpload = (url) => {
  formData.img = url
}

const uploadText = computed(() => {
  return formData.img ? 'Click here to change photo' : 'Pick photo'
})

const resetForm = () => {
  formData.title = ''
  formData.description = ''
  formData.img = ''
}
</script>

<template>
  <IModal v-if="props.isOpen" @close="emit('close')">
    <form
      @submit.prevent="emit('submit', formData, resetForm)"
      class="min-w-[260px] modals:min-w-[420px]"
    >
      <div class="flex gap-[10px] justify-center font-bold text-center mb-10">
        <MarkerIcon /> Add marker
      </div>
      <IInput label="Title" class="mb-4" v-model="formData.title" />
      <IInput
        label="Description"
        type="textarea"
        class="mb-2"
        v-model="formData.description"
      />
      <div class="flex gap-2 items-center mb-10">
        <img
          v-if="formData.img"
          :src="formData.img"
          alt="description"
          class="w-10 h-10 object-cover"
        />
        <InputImage @uploaded="handleUpload">{{ uploadText }}</InputImage>
      </div>

      <IButton class="w-full" variant="gradient" :is-loading="props.isLoading"
        >Add</IButton
      >
      <div v-if="props.hasError" class="text-red-500">
        Something went wrong...
      </div>
    </form>
  </IModal>
</template>

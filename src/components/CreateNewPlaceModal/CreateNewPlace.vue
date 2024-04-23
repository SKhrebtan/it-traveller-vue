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
  }
})
const formData = reactive({
  location: '',
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
</script>

<template>
  <IModal v-if="props.isOpen" @close="emit('close')">
    <form @submit.prevent="emit('submit', formData)" class="min-w-[420px]">
      <div class="flex gap-[10px] justify-center font-bold text-center mb-10">
        <MarkerIcon /> Add marker
      </div>
      <IInput label="Location" class="mb-4" v-model="formData.location" />
      <IInput label="Description" type="textarea" class="mb-2" v-model="formData.description" />
      <div class="flex gap-2 items-center mb-10">
        <img
          v-if="formData.img"
          :src="formData.img"
          alt="description"
          class="w-10 h-10 object-cover"
        />
        <InputImage @uploaded="handleUpload">{{ uploadText }}</InputImage>
      </div>

      <IButton class="w-full" variant="gradient">Add</IButton>
    </form>
  </IModal>
</template>

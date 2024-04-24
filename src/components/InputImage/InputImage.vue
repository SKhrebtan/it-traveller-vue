<script setup>
import UploadIcon from './UploadIcon.vue'
import { ref } from 'vue'
const emit = defineEmits(['uploaded'])
const errorMessage = ref('')
const handleUploadImage = (e) => {
  const file = e.target.files[0]
  if (file.size > 10 * 1024 * 1024) {
    errorMessage.value = 'File is too big'
    return
  }
  const fileReader = new FileReader()
  fileReader.readAsDataURL(file)
  fileReader.onload = () => {
    emit('uploaded', fileReader.result)
  }
}
</script>

<template>
  <div>
    <label class="cursor-pointer hover:text-primary">
      <input
        type="file"
        accept="image/*"
        class="hidden"
        @change="handleUploadImage"
      />
      <span class="flex gap-1 items-center">
        <UploadIcon />
        <span class="underline text-xs"><slot></slot></span>
      </span>
    </label>
    <div v-if="errorMessage" class="text-red-500">{{ errorMessage }}</div>
  </div>
</template>

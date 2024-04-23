<script setup>
import CrossIcon from '../../assets/imgs/CrossIcon.vue'
import { onMounted, onUnmounted, Teleport } from 'vue'
// import InputImage from '../InputImage/InputImage.vue'
// const imageUrlBase64 = ref('')
const emit = defineEmits(['close'])

onMounted(() => (document.body.style.overflow = 'hidden'))
onUnmounted(() => (document.body.style.overflow = 'initial'))
</script>

<template>
  <component :is="Teleport" to="body">
    <div
      @click.self="emit('close')"
      class="flex w-full h-full fixed top-0 left-0 overflow-auto bg-[rgba(0,0,0,0.3)]"
    >
      <div class="relative bg-white min-w-[350px] m-auto text-black rounded-2xl p-10">
        <button class="absolute right-3 top-3">
          <CrossIcon class="w-6 h-6" @click="emit('close')" />
        </button>
        <!-- <img v-if="imageUrlBase64" :src="imageUrlBase64" alt="photo" class="w-[320px] h-[240px]" />
        <InputImage @uploaded="(base64) => (imageUrlBase64 = base64)" /> -->
        <slot></slot>
      </div>
    </div>
  </component>
</template>

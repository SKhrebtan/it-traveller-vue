<script setup>
import CrossIcon from '../../assets/imgs/CrossIcon.vue'
import { onMounted, onUnmounted, Teleport } from 'vue'
// import InputImage from '../InputImage/InputImage.vue'
// const imageUrlBase64 = ref('')
const emit = defineEmits(['close'])

onMounted(() => (document.body.style.overflow = 'hidden'))
onUnmounted(() => (document.body.style.overflow = 'initial'))

const props = defineProps({
  isOpen: {
    type: Boolean
  }
})
console.log(props.isOpen)
</script>

<template>
  <component :is="Teleport" to="body">
    <transition name="modal">
      <div
        v-if="props.isOpen"
        @click.self="emit('close')"
        class="transition-opacity duration-500 ease-in-out flex w-full h-full fixed top-0 left-0 overflow-auto bg-[rgba(0,0,0,0.3)] z-50"
      >
        <div
          class="modal-container relative bg-white desktop:min-w-[350px] m-auto text-black rounded-2xl p-10"
        >
          <button class="absolute right-3 top-3">
            <CrossIcon class="w-6 h-6" @click="emit('close')" />
          </button>
          <!-- <img v-if="imageUrlBase64" :src="imageUrlBase64" alt="photo" class="w-[320px] h-[240px]" />
        <InputImage @uploaded="(base64) => (imageUrlBase64 = base64)" /> -->
          <slot></slot>
        </div>
      </div>
    </transition>
  </component>
</template>

<style scope>
.modal-container {
  transition: all 0.5s ease;
}
.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.2);
  transform: scale(1.22);
}
</style>

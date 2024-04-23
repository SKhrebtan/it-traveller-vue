<script setup>
import IInput from '@/components/IInput/IInput.vue'
import IButton from '@/components/IButton/IButton.vue'
import { reactive, toRaw } from 'vue'

const emit = defineEmits(['submit'])
const userData = reactive({
  email: '',
  password: ''
})

const props = defineProps({
  isLoading: {
    default: false,
    type: Boolean
  }
})
</script>

<template>
  <form @submit.prevent="emit('submit', toRaw(userData))">
    <IInput
      class="mb-4"
      label="Електронна пошта"
      v-model="userData.email"
      placeholder="email@gmail.com"
    />
    <IInput label="Пароль" v-model="userData.password" type="password" />
    <IButton class="mt-10 w-full" variant="gradient" type="submit" :is-loading="props.isLoading"
      >Login</IButton
    >
  </form>
</template>

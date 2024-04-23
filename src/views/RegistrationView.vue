<script setup>
import RegistrationForm from '../components/Auth/RegistrationForm/RegistrationForm.vue'
import { useMutation } from '../composables/useMutations.js'
import { authService } from '../api/authService/index.js'
import { useRouter } from 'vue-router'
const router = useRouter()
const {
  isLoading,
  error,
  mutation: handleRegister
} = useMutation({
  mutationFn: (data) => authService.register(data),
  onSuccess: () => router.replace('/map')
})
</script>
<template>
  <RegistrationForm @submit="handleRegister" :is-loading="isLoading" />
  <div v-if="error" class="text-red-500">{{ error }}</div>
</template>

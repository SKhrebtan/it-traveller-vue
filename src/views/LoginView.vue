<script setup>
import LoginForm from '../components/Auth/LoginForm/LoginForm.vue'
import { useMutation } from '../composables/useMutations.js'
import { useRouter } from 'vue-router'
import { authService } from '../api/authService/index.js'
const router = useRouter()
const {
  isLoading,
  error,
  mutation: handleLogin
} = useMutation({
  mutationFn: (data) => authService.login(data),
  onSuccess: () => router.replace('/map')
})
</script>
<template>
  <LoginForm @submit="handleLogin" :is-loading="isLoading" />
  <div v-if="error" class="text-red-500">{{ error }}</div>
</template>

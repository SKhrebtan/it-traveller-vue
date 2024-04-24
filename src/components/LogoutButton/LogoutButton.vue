<script setup>
import LogoutIcon from './LogoutIcon.vue'
import { logout } from '@/api/user'
import { useMutation } from '@/composables/useMutations'
import { useRouter } from 'vue-router'
import { authService } from '@/api/authService'
const router = useRouter()
const { mutation, isLoading } = useMutation({
  mutationFn: () => logout(),
  onSuccess: () => {
    authService.clearToken()
    router.replace('/auth/login')
  }
})
const handleLogout = () => {
  mutation()
}
</script>

<template>
  <button class="flex gap-2 items-center px-6 text-black" @click="handleLogout">
    <span v-if="isLoading">Loading...</span>
    <span v-else>Logout</span>
    <LogoutIcon />
  </button>
</template>

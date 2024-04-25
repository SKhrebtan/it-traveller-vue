<script setup>
import UserIcon from './UserIcon.vue'
import { getUserInfo } from '@/api/user'
import { useMutation } from '@/composables/useMutations'
import { onMounted } from 'vue'
import defaultImage from '../../assets/imgs/spider2.jpg'
import LeftArrow from '@/assets/imgs/LeftArrow.vue'
const {
  mutation: getUser,
  isLoading,
  data: userInfo
} = useMutation({
  mutationFn: () => getUserInfo()
})
onMounted(() => {
  getUser()
})
const emit = defineEmits(['fade'])

defineProps({
  isMobile: {
    type: Boolean
  }
})
</script>

<template>
  <div
    class="flex sticky top-0 items-center text-black gap-3 bg-[#ffe6dc] border-solid border-b-2 border-primary rounded-bl-2xl rounded-br-2xl px-6 py-4 mb-4"
  >
    <img
      v-if="defaultImage"
      :src="defaultImage"
      alt="user"
      class="h-12 w-12 rounded-full"
    />
    <div
      v-else
      class="w-10 h-10 flex items-center justify-center rounded-full color-primary bg-primary"
    >
      <UserIcon class="text-white" />
    </div>
    <span v-if="isLoading">Updating user...</span>
    <div v-if="userInfo" class="text-black font-bold text-2xl">
      {{ userInfo.data.name }}
    </div>
    <button v-if="isMobile" type="button" @click="emit('fade')">
      <LeftArrow class="w-10 h-10" />
    </button>
    <slot></slot>
  </div>
</template>

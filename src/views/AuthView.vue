<script setup>
import BaseLayout from '@/layouts/BaseLayout.vue'
import { RouterView, RouterLink } from 'vue-router'
</script>

<template>
  <BaseLayout>
    <section class="w-full p-10 bg-white rounded-2xl">
      <div class="flex gap-10 justify-center mb-10">
        <router-link to="registration" class="text-gray" exact-active-class="text-primary"
          >Create account</router-link
        >
        <router-link to="login" class="text-gray" exact-active-class="text-primary"
          >Login</router-link
        >
      </div>
      <router-view></router-view>
    </section>
  </BaseLayout>
</template>

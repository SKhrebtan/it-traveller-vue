<script setup>
import IButton from '../components/IButton/IButton.vue'
import BaseLayout from '@/layouts/BaseLayout.vue'
</script>

<template>
  <BaseLayout>
    <div class="text-center">
      <img class="inline mb-6" src="../assets/imgs/map-pin.svg" alt="" />
      <h1 class="font-bold text-4xl mb-7">IT traveller</h1>
      <p class="leading-6 mb-11">
        A simple and convenient web application that allows you to bookmark your favorite places as
        well as those in which you would really like to visit. So don't delay and try it yourself.
      </p>
      <IButton to="/auth/registration">Start exploring</IButton>
    </div>
  </BaseLayout>
</template>

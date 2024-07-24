<template>
     <header class="w-full bg-gray-800 text-white py-6">
    <div class="container mx-auto flex items-center justify-between">
      <div class="flex-1"></div>
      <div class="text-center">
        <h1 class="text-4xl font-bold">bibliotech</h1>
        <p class="text-lg mt-2">a smart web library manager</p>
      </div>
      <div class="flex-1 flex justify-end">
        <img src="@/assets/Bibliotech.png" alt="Logo" class="h-32">
      </div>
    </div>
    </header>
  </template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'TitleApp',
});
</script>

<style scoped></style>
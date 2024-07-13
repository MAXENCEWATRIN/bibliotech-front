<script lang="ts">
import { defineComponent } from 'vue';
import NavigationMenu from './components/NavigationMenu.vue';
import TitleApp from './components/TitleApp.vue';

export default defineComponent({
  name: 'App',
  components: {
    NavigationMenu,
    TitleApp
  },
});
</script>

<template>
  <div id="app" class="w-full bg-gray-800 text-white py-6">
    <TitleApp />
    <main>
      <router-view></router-view>
    </main>
    <NavigationMenu />
  </div>
</template>

<style>
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  background-color: #1f2937;
}
</style>

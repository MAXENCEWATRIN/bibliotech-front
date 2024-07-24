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

    <TitleApp />
    <main>
      <router-view></router-view>
    </main>
    <NavigationMenu />
</template>

<style>
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  background-color: #1f2937;
}
</style>

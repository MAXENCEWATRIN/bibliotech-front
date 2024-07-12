<template>
    <nav class="bg-gray-800 p-4">
        <ul class="flex space-x-4">
            <li>
                <router-link to="/" class="text-white hover:text-gray-300">Home</router-link>
            </li>
            <li>
                <router-link to="/book" class="text-white hover:text-gray-300">Books</router-link>
            </li>
            <li>
                <router-link to="/library" class="text-white hover:text-gray-300">Library</router-link>
            </li>
        </ul>
    </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    setup() {
        return {};
    },
});
</script>

<style scoped>
/* Ajouter des styles personnalisés si nécessaire */
</style>
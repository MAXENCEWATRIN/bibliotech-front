<template>
    <footer class="w-full bg-gray-800 text-white py-4 fixed bottom-0">
        <div class="container mx-auto text-center">
            <nav>
                <ul class="flex justify-center space-x-4">
                    <li>
                        <router-link to="/" class="hover:text-gray-400">Home</router-link>
                    </li>
                    <li>
                        <router-link to="/book" class="hover:text-gray-400">Book</router-link>
                    </li>
                    <li>
                        <router-link to="/library" class="hover:text-gray-400">Library</router-link>
                    </li>
                    <li>
                        <router-link to="/owner" class="hover:text-gray-400">Owner</router-link>
                    </li>
                    <li>
                        <router-link to="/editor" class="hover:text-gray-400">Editor</router-link>
                    </li>

                </ul>
            </nav>
        </div>
    </footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'NavigationMenu',
});
</script>

<style scoped></style>
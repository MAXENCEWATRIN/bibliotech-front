<template>
    <footer class="w-full bg-gray-800 text-white py-4 fixed bottom-0">
        <div class="container mx-auto text-center">
            <nav>
                <ul class="flex justify-center space-x-4">
                    <li>
                        <router-link to="/" class="hover:text-gray-400">Home</router-link>
                    </li>
                    <li>
                        <router-link to="/books" class="hover:text-gray-400">Books</router-link>
                    </li>
                    <li>
                        <router-link to="/libraries" class="hover:text-gray-400">Libraries</router-link>
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
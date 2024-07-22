<template>
    <div v-if="visible" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="modale p-6 rounded-lg shadow-lg w-1/3">
            <h2 class="text-white text-2xl mb-4">Add New Library</h2>
            <form @submit.prevent="handleSubmit">
                <div class="mb-4">
                    <label for="name" class="block text-sm font-medium text-white">Name</label>
                    <input type="text" v-model="library.name" id="name"
                        class="background-custom-input-form mt-1 block w-full border-gray-300 rounded-md shadow-sm">
                </div>
                <div class="mb-4">
                    <label for="location" class="block text-sm font-medium text-white">Location</label>
                    <input type="text" v-model="library.location" id="location"
                        class="background-custom-input-form mt-1 block w-full border-gray-300 rounded-md shadow-sm">
                </div>
                <div class="mb-4">
                    <label for="capacity" class="block text-sm font-medium text-white">Capacity</label>
                    <input type="text" v-model="library.capacity" id="capacity"
                        class="background-custom-input-form mt-1 block w-full border-gray-300 text-white rounded-md shadow-sm">
                </div>
                <div class="flex justify-end">
                    <button type="button" @click="close" class="mr-2 px-4 py-2 bg-gray-300 rounded-md">Cancel</button>
                    <button type="submit" class="px-4 py-2 background-custom-button-submit text-white rounded-md">Submit</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import type { LibraryResponse } from '../model/LibraryResponse';

export default defineComponent({
    name: 'LibraryForm',
    props: {
        visible: {
            type: Boolean,
            required: true
        }
    },
    emits: ['close', 'submit'],
    setup(props, { emit }) {
        const library = ref<LibraryResponse>({
            id: null,
            name: '',
            location: '',
            capacity: 0
        });
        const handleSubmit = () => {
            emit('submit', library.value);
            library.value = { id: 0, name: '', location: '', capacity: 0 };
        };
        const close = () => {
            emit('close');
        };

        return {
            library,
            handleSubmit,
            close
        };
    }
});
</script>

<style scoped>
.modale {
   background-color: #1f2937;
}
.background-custom-input-form {
  background-color: #35495e;
}
.background-custom-button-submit {
    background-color: #42b883;
}
</style>
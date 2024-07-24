<template>
    <div v-if="visible" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="modale p-6 rounded-lg shadow-lg w-1/3">
            <h2 class="text-white text-2xl mb-4">Add New Editor</h2>
            <form @submit.prevent="handleSubmit">
                <div class="mb-4">
                    <label for="name" class="block text-sm font-medium text-white">Name</label>
                    <input type="text" v-model="editor.name" id="name"
                        class="background-custom-input-form mt-1 block w-full border-gray-300 rounded-md shadow-sm">
                </div>
                <div class="mb-4">
                    <label for="category" class="block text-sm font-medium text-white">Category</label>
                    <input type="text" v-model="editor.category" id="category"
                        class="background-custom-input-form mt-1 block w-full border-gray-300 rounded-md shadow-sm">
                </div>
                <div class="mb-4">
                    <label for="edition" class="block text-sm font-medium text-white">Edition</label>
                    <input type="text" v-model="editor.edition" id="edition"
                        class="background-custom-input-form mt-1 block w-full border-gray-300 rounded-md shadow-sm">
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
import type { EditorResponse } from '../model/EditorResponse';

export default defineComponent({
    name: 'EditorForm',
    props: {
        visible: {
            type: Boolean,
            required: true
        }
    },
    emits: ['close', 'submit'],
    setup(props, { emit }) {
        const editor = ref<EditorResponse>({
            id: null,
            name: '',
            category: '',
            edition: ''
        });
        const handleSubmit = () => {
            // Emit the editor object to the parent component
            emit('submit', editor.value);
            // Reset the editor object
            editor.value = { id: null, name: '', category: '', edition: '' };
        };
        const close = () => {
            emit('close');
        };

        return {
            editor,
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
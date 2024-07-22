<template>
    <div v-if="visible" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="modale p-6 rounded-lg shadow-lg w-1/3">
            <h2 class="text-white text-2xl mb-4">Add New Owner</h2>
            <form @submit.prevent="handleSubmit">
                <div class="mb-4">
                    <label for="firstname" class="block text-sm font-medium text-white">FirstName</label>
                    <input type="text" v-model="owner.firstname" id="firstname"
                        class="background-custom-input-form mt-1 block w-full border-gray-300 rounded-md shadow-sm">
                </div>
                <div class="mb-4">
                    <label for="lastname" class="block text-sm font-medium text-white">Lastname</label>
                    <input type="text" v-model="owner.lastname" id="lastname"
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
import type { OwnerResponse } from '../model/OwnerResponse';

export default defineComponent({
    name: 'OwnerForm',
    props: {
        visible: {
            type: Boolean,
            required: true
        }
    },
    emits: ['close', 'submit'],
    setup(props, { emit }) {
        const owner = ref<OwnerResponse>({
            id: null,
            firstName: '',
            lastName: ''
        });
        const handleSubmit = () => {
            // Emit the owner object to the parent component
            emit('submit', owner.value);
            // Reset the owner object
            owner.value = { id: null, firstName: '', lastName: ''};
        };
        const close = () => {
            emit('close');
        };

        return {
            owner,
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
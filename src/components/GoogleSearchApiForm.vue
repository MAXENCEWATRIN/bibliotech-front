<template>
    <div v-if="visible" class="fixed z-10 inset-0 overflow-y-auto">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 transition-opacity" aria-hidden="true">
          <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div class="background-custom-color-form px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 class="text-lg leading-6 font-medium text-gray-900">Google photos search</h3>
                <div class="mt-2">
                  <input type="text" v-model="query" placeholder="Search for images" class="border p-2 w-full"/>
                  <button @click="searchImages" class="mt-2 background-custom-color-button text-white py-2 px-4 rounded">Search</button>
                  <button @click="$emit('close')" type="button"
                  class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">Close</button>
                  <div v-if="results.length">
                    <div v-for="result in results" :key="result.link" class="mt-4">
                      <img :src="result.link" class="w-full"/>
                      <button @click="selectImage(result.link)" class="mt-2 bg-green-500 text-white py-2 px-4 rounded">Select</button>
                    </div>
                  </div>
                  <div v-else-if="loading" class="mt-4">Loading...</div>
                  <div v-else-if="error" class="mt-4 text-red-500">{{ error }}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
         
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'GoogleSearchApiForm',
    props: {
      visible: {
        type: Boolean,
        required: true
      },
      researchPrompt: {
        type: String,
        required: false
      }
    },
    data() {
      return {
        query: '',
        results: [],
        loading: false,
        error: ''
      };
    },
    watch: {
      researchPrompt: {
        immediate: true,
        handler(newVal) {
          if (newVal) {
            this.query = newVal;
            this.searchImages();
          }
        }
      }
    },
    methods: {
      async searchImages() {
        this.loading = true;
        this.error = '';
        try {
          const apiKey = import.meta.env.VITE_API_CUSTOM_SEARCH_GOOGLE_KEY;
          const cx = import.meta.env.VITE_API_CUSTOM_SEARCH_GOOGLE_ENGINE_ID;
          const response = await axios.get(import.meta.env.VITE_API_CUSTOM_SEARCH_GOOGLE_URL, {
            params: {
              key: apiKey,
              cx: cx,
              q: this.query,
              searchType: 'image',
              num: 10
            }
          });
          this.results = response.data.items.map(item => ({ link: item.link }));
        } catch (err) {
          this.error = 'Failed to fetch images. Please try again.';
          console.error(err);
        } finally {
          this.loading = false;
        }
      },
      selectImage(link) {
        this.$emit('imageSelected', link);
        this.$emit('close');
      }
    }
  };
  </script>
  
  <style scoped>
 
.background-custom-color-form {
  background-color: #35495e;
}

.background-custom-color-button {
  background-color: #42b883;
}

  </style>
  
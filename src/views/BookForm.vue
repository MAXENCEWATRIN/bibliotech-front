<template>
  <div>
    <h1>{{ isEditMode ? 'Edit Book' : 'Add New Book' }}</h1>
    <form @submit.prevent="saveBook">
      <div>
        <label for="title">Title</label>
        <input type="text" v-model="response.data" required>
      </div>
      <div>
        <label for="authorName">Author</label>
        <input type="text" v-model="response.data" required>
      </div>
      <!-- Ajouter les autres champs ici -->
      <button type="submit">{{ isEditMode ? 'Update' : 'Create' }}</button>
    </form>
  </div>
</template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import axios from 'axios';
  import { useRoute, useRouter } from 'vue-router';
  import type { BibliotoBackResponsePattern } from '../model/BibliotoBackResponsePattern';

  export default defineComponent({
    data() {
      return {
        response: {
        success: false,
        data: {}
      } as BibliotoBackResponsePattern,
      isEditMode: false
    };
    },
    methods: {
      fetchBook(id: number) {
        axios.get(`http://localhost:8080/biblioto/books/${id}`)
          .then((response: { data: any; }) => {
            console.log('Fetched book data:', response.data);
            this.response = response.data;
          })
          .catch((error: any) => {
            console.error("There was an error!", error);
          });
      },
      saveBook() {
        if (this.isEditMode) {
          axios.put(`http://localhost:8080/biblioto/books/${this.book.id}`, this.book)
            .then(() => {
              
              this.$router.push('/');
            })
            .catch((error: any) => {
              console.error("There was an error!", error);
            });
        } else {
          axios.post('http://localhost:8080/biblioto/books', this.book)
            .then((response: { data: any; }) => {
              console.log('Fetched book data:', response.data);
              this.$router.push('/');
            })
            .catch((error: any) => {
              console.error("There was an error!", error);
            });
        }
      }
    },
    created() {
      const route = useRoute();
      const router = useRouter();
      const bookId = route.params.id;
      if (bookId) {
        this.isEditMode = true;
        this.fetchBook(Number(bookId));
      }
    }
  });
  </script>
  
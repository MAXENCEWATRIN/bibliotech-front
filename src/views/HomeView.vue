<template>
  <div>
    <h1>Books List</h1>
    <router-link to="/book">Add New Book</router-link>
    <ul>
      <li v-for="book in response.data" :key="book.id">
        <router-link :to="{ name: 'BookForm', params: { id: book.id } }">{{ book.title }}</router-link>
        <button @click="deleteBook(book.id)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';
import type { BibliotoBackResponsePattern } from '../model/BibliotoBackResponsePattern';


export default defineComponent({
  data() {
      return {
        response: {
        success: false,
        data: {}
      } as BibliotoBackResponsePattern
    };
    },
  methods: {
    fetchBooks() {
      axios.get('http://localhost:8080/biblioto/books')
        .then((response: { data: any; }) => {
          this.response = response.data;
        })
        .catch((error: any) => {
          console.error("There was an error!", error);
        });
    },
    deleteBook(id: number) {
      axios.delete(`http://localhost:8080/biblioto/books/${id}`)
        .then(() => {
          this.fetchBooks();
        })
        .catch((error: any) => {
          console.error("There was an error!", error);
        });
    }
  },
  created() {
    this.fetchBooks();
  }
});
</script>

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
  <div>
    <h1>Books Carousel</h1>
    <Carousel :items-to-show="2.5" :wrap-around="true">
      <Slide v-for="book in response.data" :key="book.id">
        <div class="carousel__item">
          <BookCard :book="book" />
        </div>

      </Slide>
      <template #addons>
        <Navigation />
        <Pagination />
      </template>
    </Carousel>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';
import type { GetAllBooksResponse } from '../model/GetAllBooksResponse';
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';
import BookCard from '../components/BookCard.vue';

export default defineComponent({
  name: 'WrapAround',
  components: {
    Carousel,
    Slide,
    BookCard,
    Pagination,
    Navigation,
  },
  data() {
    return {
      response: {
        success: false,
        data: {}
      } as GetAllBooksResponse
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
<style>
.carousel__item {
  min-height: 200px;
  width: 100%;
  background-color: var(--vc-clr-primary);
  color: var(--vc-clr-white);
  font-size: 20px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.carousel__slide {
  padding: 10px;
}

.carousel__prev,
.carousel__next {
  box-sizing: content-box;
  border: 5px solid white;
}
</style>

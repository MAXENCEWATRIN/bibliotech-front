<template>
  <div>
    <h1>Books List</h1>
    <router-link to="/book">Add New Book</router-link>
    <ul>
      <li v-for="book in response.data" :key="book.id">
        <router-link :to="{ name: 'BookForm', params: { id: book.id } }">{{ book.title }}</router-link>
        <button @click="deleteBook(book)">Delete</button>

      </li>
    </ul>
  </div>
  <div>
    <h1>Books Carousel</h1>
    <select v-model="selectedTheme" @change="filterBooks">
      <option value="">All Themes</option>
      <option v-for="theme in themes" :key="theme">{{ theme }}</option>
    </select>
    <Carousel :items-to-show="2.5" :wrap-around="true">
      <Slide v-for="book in filteredBooks" :key="book.id">
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
import { defineComponent, ref, computed, onMounted } from 'vue';
import axios from 'axios';
import type { GetAllBooksResponse } from '../model/GetAllBooksResponse';
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';
import BookCard from '../components/BookCard.vue';
import type { BookResponse } from '@/model/BookResponse';

export default defineComponent({
  name: 'WrapAround',
  components: {
    Carousel,
    Slide,
    BookCard,
    Pagination,
    Navigation,
  },
  setup() {
    const response = ref<GetAllBooksResponse>({
      success: false,
      data: [],
    });
    const themes = ref<string[]>([]);
    const selectedTheme = ref<string>('');

    const fetchBooks = async () => {
      try {
        const result = await axios.get('http://localhost:8080/biblioto/books');
        response.value = result.data;
        const allThemes = new Set<string>();
        response.value.data.forEach(book => {
          book.themes.forEach(theme => {
            allThemes.add(theme.name);
          });
        });
        themes.value = Array.from(allThemes);
      } catch (error) {
        console.error('There was an error!', error);
      }
    };

    const filteredBooks = computed(() => {
      if (!selectedTheme.value) {
        return response.value.data;
      }
      return response.value.data.filter(book =>
        book.themes.some(theme => theme.name === selectedTheme.value)
      );
    });

    const deleteBook = async (book: BookResponse) => {
      try {
        await axios.delete(`http://localhost:8080/biblioto/books/${book.id}`, {
          data: { book },
        });
        fetchBooks();
      } catch (error) {
        console.error('There was an error!', error);
      }
    };

    onMounted(fetchBooks);

    return {
      response,
      themes,
      selectedTheme,
      filteredBooks,
      deleteBook,
    };
  },
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

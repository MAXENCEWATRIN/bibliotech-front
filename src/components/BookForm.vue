<template>
  <div>
    <h1>{{ isEditMode ? 'Edit Book' : 'Add New Book' }}</h1>
    <form @submit.prevent="saveBook">
      <div>
        <label for="title">Title</label>
        <input type="text" v-model="book.title" required />
        {{ book.title }}
      </div>
      <div>
        <label for="authorName">Author</label>
        <input type="text" v-model="book.authorName" required />
      </div>
      <!-- Ajouter les autres champs ici -->
      <button type="submit">{{ isEditMode ? 'Update' : 'Create' }}</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';
import type { GetOneBookResponse } from '../model/GetOneBookResponse';
import { useBookStore } from '../store/bookStore';

export default defineComponent({
  setup() {
    const bookStore = useBookStore();
    const book = ref<GetOneBookResponse>(bookStore.book || {
      id: null,
      isbnId: null,
      oldIsbnId: null,
      title: '',
      authorName: '',
      titleLong: '',
      subtitle: '',
      synopsis: '',
      summary: '',
      numberOfPage: 0,
      openLibraryId: '',
      coverPageUrl: '',
      traductionLanguage: '',
      initialLanguage: '',
      firstPublishYear: 0,
      firstSentence: '',
      editor: null,
      library: null,
      themes: [],
      owner: null,
      isWishList: false,
      overallReception: '',
      praises: '',
      criticisms: '',
      isAnOpenLibaryApiRegister: false,
      isAnOpenLibaryApiBookValidate: false
    });

    const isEditMode = ref(false);
    const route = useRoute();
    const router = useRouter();

    onMounted(() => {
      console.log('TEST : ' + bookStore.book)
      if (bookStore.book) {
        book.value = bookStore.book;
        console.log(book.value)
        bookStore.clearBook(); // Reset the store value
      } else if (route.params.id) {
        // Fetch book by id if not coming from WebSocket
        isEditMode.value = true;
        fetchBook(Number(route.params.id));
      }
    });

    const fetchBook = async (id: number) => {
      try {
        const response = await axios.get(`http://localhost:8080/biblioto/books/${id}`);
        book.value = response.data;
        console.log('FETCH : ' + book.value)
      } catch (error) {
        console.error('Error fetching book:', error);
      }
    };

    const saveBook = async () => {
      try {
        if (isEditMode.value) {
          await axios.put(`http://localhost:8080/biblioto/books/${book.value.id}`, book.value);
        } else {
          await axios.post('http://localhost:8080/biblioto/books', book.value);
        }
        router.push('/');
      } catch (error) {
        console.error('Error saving book:', error);
      }
    };

    return {
      book,
      isEditMode,
      saveBook,
    };
  },
});
</script>
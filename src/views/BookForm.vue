<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">{{ isEditMode ? 'Edit Book' : 'Add New Book' }}</h1>
    <form @submit.prevent="saveBook" class="space-y-4">
      <div>
        <label for="isbnId" class="block text-sm font-medium text-white-700">ISBN ID</label>
        <input type="number" v-model="book.isbnId"
          class="block appearance-none w-full bg-black border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          required />
      </div>
      <div>
        <label for="oldIsbnId" class="block text-sm font-medium text-white-700">Old ISBN ID</label>
        <input type="number" v-model="book.oldIsbnId"
          class="block appearance-none w-full bg-black border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
      </div>
      <div>
        <label for="title" class="block text-sm font-medium text-white-700">Title</label>
        <input type="text" v-model="book.title"
          class="block appearance-none w-full bg-black border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          required />
      </div>
      <div>
        <label for="authorName" class="block text-sm font-medium text-white-700">Author Name</label>
        <input type="text" v-model="book.authorName"
          class="block appearance-none w-full bg-black border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          required />
      </div>
      <div>
        <label for="titleLong" class="block text-sm font-medium text-white-700">Title Long</label>
        <input type="text" v-model="book.titleLong"
          class="block appearance-none w-full bg-black border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
      </div>
      <div>
        <label for="subtitle" class="block text-sm font-medium text-white-700">Subtitle</label>
        <input type="text" v-model="book.subtitle"
          class="block appearance-none w-full bg-black border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
      </div>
      <div>
        <label for="synopsis" class="block text-sm font-medium text-white-700">Synopsis</label>
        <textarea v-model="book.synopsis"
          class="block appearance-none w-full bg-black border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"></textarea>
      </div>
      <div>
        <label for="summary" class="block text-sm font-medium text-white-700">Summary</label>
        <textarea v-model="book.summary"
          class="block appearance-none w-full bg-black border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">      </div>
      <div>
        <label for="numberOfPage" class="block text-sm font-medium text-white-700">Number of Pages</label>
        <input type="number" v-model="book.numberOfPage"
        class="block appearance-none w-full bg-black border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"       required />
      </div>
      <div>
        <label for="openLibraryId" class="block text-sm font-medium text-white-700">Open Library ID</label>
        <input type="text" v-model="book.openLibraryId"
        class="block appearance-none w-full bg-black border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">      </div>
      <div>
        <label for="coverPageUrl" class="block text-sm font-medium text-white-700">Cover Page URL</label>
        <input type="text" v-model="book.coverPageUrl"
        class="block appearance-none w-full bg-black border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">      </div>
      <div>
        <label for="traductionLanguage" class="block text-sm font-medium text-white-700">Translation Language</label>
        <input type="text" v-model="book.traductionLanguage"
        class="block appearance-none w-full bg-black border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">      </div>
      <div>
        <label for="initialLanguage" class="block text-sm font-medium text-white-700">Initial Language</label>
        <input type="text" v-model="book.initialLanguage"
        class="block appearance-none w-full bg-black border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">      </div>
      <div>
        <label for="firstPublishYear" class="block text-sm font-medium text-white-700">First Publish Year</label>
        <input type="number" v-model="book.firstPublishYear"
        class="block appearance-none w-full bg-black border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">      </div>
      <div>
        <label for="firstSentence" class="block text-sm font-medium text-white-700">First Sentence</label>
        <input type="text" v-model="book.firstSentence"
        class="block appearance-none w-full bg-black border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">      </div>
      <div class="flex items-center">
        <input type="checkbox" v-model="book.isWishList" class="h-4 w-4 text-indigo-600 border-gray-300 rounded" />
        <label for="isWishList" class="ml-2 block text-sm font-medium text-white-700">Is Wish List</label>
      </div>
      <div>
        <label for="overallReception" class="block text-sm font-medium text-white-700">Overall Reception</label>
        <textarea v-model="book.overallReception"
        class="block appearance-none w-full bg-black border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"        custom-text-color></textarea>
      </div>
      <div>
        <label for="praises" class="block text-sm font-medium text-white-700">Praises</label>
        <textarea v-model="book.praises"
          class="block appearance-none w-full bg-black border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          custom-text-color></textarea>
      </div>
      <div>
        <label for="criticisms" class="block text-sm font-medium text-white-700">Criticisms</label>
        <textarea v-model="book.criticisms"
          class="block appearance-none w-full bg-black border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          custom-text-color></textarea>
      </div>
      <div class="flex items-center">
        <input type="checkbox" v-model="book.isAnOpenLibaryApiRegister"
          class="h-4 w-4 text-indigo-600 border-gray-300 rounded" />
        <label for="isAnOpenLibaryApiRegister" class="ml-2 block text-sm font-medium text-white-700">Is
          an Open Library
          API Register</label>
      </div>
      <div class="flex items-center">
        <input type="checkbox" v-model="book.isAnOpenLibaryApiBookValidate"
          class="h-4 w-4 text-indigo-600 border-gray-300 rounded" />
        <label for="isAnOpenLibaryApiBookValidate" class="ml-2 block text-sm font-medium text-white-700">Is an Open
          Library API Book Validate</label>
      </div>
      <button v-if="isEditMode" @click="deleteBook(book.id)" type="button"
        class="mt-4 px-4 py-2 bg-red-600 text-white rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">Delete</button>

      <button type="submit"
        class="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        {{ isEditMode ? 'Update' : 'Create' }}</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useBookStore } from '../store/bookStore';
import type { BookResponse } from '../model/BookResponse';
import bookService from '../service/BookService';
import router from '@/router';

export default defineComponent({
  setup() {
    const bookStore = useBookStore();
    const book = ref<BookResponse>(bookStore.book || {
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
      cover: '',
      traductionLanguage: '',
      initialLanguage: '',
      firstPublishYear: 0,
      firstSentence: '',
      editor: {},
      library: {},
      themes: [],
      owner: {},
      isWishList: false,
      overallReception: '',
      praises: '',
      criticisms: '',
      isAnOpenLibaryApiRegister: false,
      isAnOpenLibaryApiBookValidate: false
    });
    const isEditMode = ref(false);
    const route = useRoute();

    onMounted(async () => {
      if (bookStore.book) {
        book.value = bookStore.book;
        bookStore.clearBook();
      } else if (route.params.id) {
        // Fetch book by id if not coming from WebSocket
        isEditMode.value = true;

        try {
          const bookResponse = await bookService.getBookDetails(Number(route.params.id));
          if (bookResponse.status === 200) {
            console.log("Livre récupéré avec succès." + bookResponse.data.data);
            book.value = bookResponse.data.data;
          } else {
            console.error(`Erreur lors de la récupération du livre, statut : ${bookCoverResponse.status}`);
          }
        } catch (error) {
          console.error("Erreur lors de l'appel du livre:", error);
        }

      }
    });
    const saveBook = async () => {
      try {
        await bookService.saveBook(book.value, isEditMode.value);
        router.push('/');
      } catch (error) {
        console.error('Error saving book:', error);
      }
    };

    const deleteBook = async (id: number) => {
      try {
        await bookService.deleteBook(id);
        router.push('/');
      } catch (error) {
        console.error('Error deleting book:', error);
      }
    };
    return {
      book,
      isEditMode,
      saveBook,
      deleteBook
    };
  },
});
</script>

<style scoped>
.custom-text-color {
  color: #000000;
  /* Exemple de couleur bleue personnalisée */
}

.book-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.book-cover {
  max-width: 100%;
  height: auto;
  border-radius: 10px;
}

.book-details {
  margin-top: 10px;
}
</style>
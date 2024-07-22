<template>

  <div>
    <div class="relative w-full max-w-xs mx-auto mb-6">
      <select v-model="selectedTheme" @change="filterBooks"
        class="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer">
        <option value="" class="sr-only">All Themes</option>
        <option v-for="theme in themes" :key="theme" class="sr-only">{{ theme }}</option>
      </select>
    </div>
    <Carousel :key="carouselKey" :items-to-show="3.95" :wrap-around="true" :transition="500"
      class="w-full bg-gray-800 text-white py-6" style="margin-top: 5%;">
      <Slide v-for="book in filteredBooks" :key="book">
        <div class="carousel__item">
          <BookCard :book="book" />
        </div>

      </Slide>
      <template #addons>
        <Navigation />
      </template>
    </Carousel>

  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, watch } from 'vue';
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide, Navigation } from 'vue3-carousel';
import BookCard from '../components/BookCard.vue';
import 'vue3-carousel/dist/carousel.css'
import bookService from '../service/BookService';
import type { GetAllBooksResponse } from '../model/GetAllBooksResponse';

import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'WrapAround',
  components: {
    Carousel,
    Slide,
    BookCard,
    Navigation,
  },
  setup() {
    const response = ref<GetAllBooksResponse>({
      success: false,
      data: [],
    });
    const themes = ref<string[]>([]);
    const selectedTheme = ref<string>('');
    const carouselKey = ref<number>(0);
    const router = useRouter();

    const fetchBooks = async () => {
      try {
        const result = await bookService.fetchBooks();
        response.value = result.data;

        // Rediriger vers /book si la liste est vide
        if (response.value.data.length === 0) {
          router.push('/book');
          return;
        }


        response.value = result.data;
        const allThemes = new Set<string>();

        await Promise.all(response.value.data.map(async book => {
          try {
            const bookCoverResponse = await bookService.getBookCover(book.id);
            if (bookCoverResponse.status === 200) {
              console.log("La couverture du livre a été récupérée avec succès.");
              book.cover = URL.createObjectURL(bookCoverResponse.data);
            } else {
              console.error(`Erreur lors de la récupération de la couverture du livre, statut : ${bookCoverResponse.status}`);
            }
          } catch (error) {
            console.error("Erreur lors de l'appel de getBookCover:", error);
          }

          book.themes.forEach(theme => {
            allThemes.add(theme.name);
          });
        }));
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

    const filterBooks = () => {
      // Update the key to force the carousel to re-render
      carouselKey.value++;
    };

    watch(filteredBooks, () => {
      filterBooks();
    });

    onMounted(fetchBooks);

    return {
      response,
      themes,
      selectedTheme,
      filteredBooks,
      carouselKey
    };
  },
});
</script>
<style>
.carousel__slide {
  padding: 5px;
}

.carousel__viewport {
  perspective: 2000px;
  background-color: #1f2937;
}

.carousel__track {
  transform-style: preserve-3d;
}

.carousel__slide--sliding {
  transition: 0.5s;
}

.carousel__next {
  background-color: #1f2937;
  border-radius: 50%;
}

.carousel__prev {
  border-radius: 50%;
  background-color: #1f2937;
}

.carousel__slide {
  opacity: 0.9;
  transform: rotateY(-20deg) scale(0.9);
}

.carousel__slide--active~.carousel__slide {
  transform: rotateY(20deg) scale(0.9);
}

.carousel__slide--prev {
  opacity: 1;
  transform: rotateY(-10deg) scale(0.95);
}

.carousel__slide--next {
  opacity: 1;
  transform: rotateY(10deg) scale(0.95);
}

.carousel__slide--active {
  opacity: 1;
  transform: rotateY(0) scale(1.1);
}

img {
  max-width: 100%;
  height: auto;
}
</style>

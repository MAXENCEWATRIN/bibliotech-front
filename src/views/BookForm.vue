<template>
  <div class="grid grid-cols-2 gap-4 flex-nowrap">
    <div class="custom-margin grid grid-cols-1 gap-4">
      <h1 class="text-2xl font-bold mb-4 text-center text-white">
        {{ isEditMode ? 'Book cover' : 'Choose a book cover' }}</h1>
      <ImageUploader :editImage="book.cover" />
      <button @click="openModalGoogleSearch" type="button"
        class="mt-4 px-4 py-2  background-custom-color-button text-white rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">Search
        for cover picture</button>
      <div class="items-center space-y-4">
        <h1 class="text-2xl font-bold mb-4 text-center text-white">
          {{ isEditMode ? 'Complementary information' : 'Choose complementary information' }}</h1>

        <div class="flex items-center space-x-4">
          <label for="libraries" class="block mb-2 text-sm font-medium text-white dark:text-white">Library : </label>
          <select v-model="selectedLibrary"
            class="background-custom-color-form border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option v-for="library in librariesResponse.data" :key="library.id" :value="library.id">
              {{ library.name }}
            </option>
          </select>
          <div>
            <button @click="openModalLibrary" class="px-4 py-2 background-custom-color-button text-white rounded-md">
              <i class="fas fa-plus"></i></button>
            <LibraryForm :visible="isModalLibraryVisible" @close="closeModalLibrary"
              @submit="handleFormSubmitAddLibrary" />
          </div>
        </div>



        <div class="flex items-center space-x-4">

          <label for="themes_multiple" class="block mb-2 text-sm font-medium text-white dark:text-white">Themes
            :</label>
          <select multiple v-model="selectedThemes"
            class="background-custom-color-form text-white border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/3  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option v-for="theme in themesResponse.data" :key="theme.id" :value="theme.id">
              {{ theme.name }}
            </option>
          </select>
          <div>
            <button @click="openModalTheme" class="px-4 py-2 background-custom-color-button text-white rounded-md"> <i
                class="fas fa-plus"></i></button>
            <ThemeForm :visible="isModalThemeVisible" @close="closeModalTheme" @submit="handleFormSubmitAddTheme" />
          </div>
        </div>

        <div class="flex items-center space-x-4">
          <label for="owners" class="block mb-2 text-sm font-medium text-white dark:text-white">Owner :</label>

          <select v-model="selectedOwner"
            class="background-custom-color-form border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option v-for="owner in ownersResponse.data" :key="owner.id" :value="owner.id">
              {{ owner.firstName }} {{ owner.lastName }}
            </option>
          </select>
          <div>
            <button @click="openModalOwner" class="px-4 py-2  background-custom-color-button text-white rounded-md"><i
                class="fas fa-plus"></i></button>
            <OwnerForm :visible="isModalOwnerVisible" @close="closeModalOwner" @submit="handleFormSubmitAddOwner" />
          </div>
        </div>


        <div class="flex items-center space-x-4">
          <label for="editors" class="block mb-2 text-sm font-medium text-white dark:text-white">Editor :</label>
          <select v-model="selectedEditor"
            class="background-custom-color-form border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option v-for="editor in editorsResponse.data" :key="editor.id"> {{ editor.name }}, edition :
              {{ editor.edition }}</option>
          </select>
          <div>
            <button @click="openModalEditor" class="px-4 py-2 background-custom-color-button text-white rounded-md"><i
                class="fas fa-plus"></i></button>
            <EditorForm :visible="isModalEditorVisible" @close="closeModalEditor" @submit="handleFormSubmitAddEditor" />
          </div>
        </div>
      </div>
    </div>
    <div class="custom-margin">
      <h1 class="text-2xl font-bold mb-4 text-center text-white">{{ isEditMode ? 'Edit Book' : 'Add New Book' }}
      </h1>
      <form @submit.prevent="saveBook" class="space-y-4">
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label for="isbnId" class="block text-sm font-medium text-white">ISBN ID</label>
            <input type="number" v-model="book.isbnId"
              class="block appearance-none text-white w-full background-custom-color-form border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              required />
          </div>
          <div>
            <label for="oldIsbnId" class="block text-sm font-medium text-white">Old ISBN ID</label>
            <input type="number" v-model="book.oldIsbnId"
              class="block appearance-none text-white w-full background-custom-color-form border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
          </div>
        </div>
        <div>
          <label for="title" class="block text-sm font-medium text-white">Title</label>
          <input type="text" v-model="book.title"
            class="block appearance-none text-white w-full background-custom-color-form border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            required />
        </div>
        <div>
          <label for="authorName" class="block text-sm font-medium text-white">Author Name</label>
          <input type="text" v-model="book.authorName"
            class="block appearance-none text-white w-full background-custom-color-form border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            required />
        </div>
        <div>
          <label for="titleLong" class="block text-sm font-medium text-white">Title Long</label>
          <input type="text" v-model="book.titleLong"
            class="block appearance-none text-white w-full background-custom-color-form border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
        </div>
        <div>
          <label for="subtitle" class="block text-sm font-medium text-white">Subtitle</label>
          <input type="text" v-model="book.subtitle"
            class="block appearance-none text-white w-full background-custom-color-form border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label for="traductionLanguage" class="block text-sm font-medium text-white">Translation Language</label>
            <input type="text" v-model="book.traductionLanguage"
              class="block appearance-none text-white w-full background-custom-color-form border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
          </div>
          <div>
            <label for="initialLanguage" class="block text-sm font-medium text-white">Initial Language</label>
            <input type="text" v-model="book.initialLanguage"
              class="block appearance-none text-white w-full background-custom-color-form border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
          </div>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label for="firstPublishYear" class="block text-sm font-medium text-white">First Publish Year</label>
            <input type="text" v-model="book.firstPublishYear"
              class="block appearance-none text-white w-full background-custom-color-form border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
          </div>
          <div>
            <label for="numberOfPage" class="block text-sm font-medium text-white">Number of Pages</label>
            <input type="text" v-model="book.numberOfPage"
              class="block appearance-none text-white w-full background-custom-color-form border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              required />
          </div>

        </div>


        <div class="grid grid-cols-2 gap-4">
          <div>
            <NotationBookFormVue :visible="isModalNotationVisible" @close="closeModalNotation">
              <div>
                <label for="firstSentence" class="block text-sm font-medium text-white">First Sentence</label>
                <input type="text" v-model="book.firstSentence"
                  class="block appearance-none text-white w-full background-custom-color-form border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
              </div>
              <div>
                <label for="synopsis" class="block text-sm font-medium text-white">Synopsis</label>
                <textarea v-model="book.synopsis"
                  class="block appearance-none text-white w-full background-custom-color-form border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"></textarea>
              </div>
              <div>
                <label for="summary" class="block text-sm font-medium text-white">Summary</label>
                <textarea v-model="book.summary"
                  class="block appearance-none text-white w-full background-custom-color-form border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
          </textarea>
              </div>
              <div>
                <label for="overallReception" class="block text-sm font-medium text-white">Overall Reception</label>
                <textarea v-model="book.overallReception"
                  class="block appearance-none text-white w-full background-custom-color-form border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline custom-text-color"></textarea>
              </div>
              <div>
                <label for="praises" class="block text-sm font-medium text-white">Praises</label>
                <textarea v-model="book.praises"
                  class="block appearance-none text-white w-full background-custom-color-form border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                  custom-text-color></textarea>
              </div>
              <div>
                <label for="criticisms" class="block text-sm font-medium text-white">Criticisms</label>
                <textarea v-model="book.criticisms"
                  class="block appearance-none text-white w-full background-custom-color-form border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                  custom-text-color></textarea>
              </div>
            </NotationBookFormVue>
            <button @click="openModalNotation" type="button"
              class="mt-4 px-4 py-2  background-custom-color-button text-white rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">Add
              supplementary information</button>
          </div>
        </div>

        <div>
          <label class="inline-flex items-center mb-5 cursor-pointer">
            <input type="checkbox" v-model="book.isWishList" class="sr-only peer">
            <div
              class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600">
            </div>
            <span class="ms-3 text-sm font-medium text-white dark:text-gray-300">Wish List ?</span>
          </label>
        </div>
        <div>
          <label class="inline-flex items-center mb-5 cursor-pointer">
            <input type="checkbox" v-model="book.isAnOpenLibaryApiRegister" class="sr-only peer" disabled>
            <div
              class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600">
            </div>
            <span class="ms-3 text-sm font-medium text-white dark:text-gray-300">Come frome OpenLibrary ?</span>
          </label>
        </div>
        <div>
          <label class="inline-flex items-center mb-5 cursor-pointer">
            <input type="checkbox" v-model="book.isAnOpenLibaryApiBookValidate" class="sr-only peer" disabled>
            <div
              class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600">
            </div>
            <span class="ms-3 text-sm font-medium text-white dark:text-gray-300">Made with openLibrary information
              ?</span>
          </label>
        </div>

        <button v-if="isEditMode" @click="deleteBook(book.id)" type="button"
          class="mt-4 px-4 py-2 bg-red-600 text-white rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">Delete</button>

        <button type="submit"
          class="mt-4 px-4 py-2 background-custom-color-button text-white rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
          {{ isEditMode ? 'Update' : 'Create' }}</button>
      </form>
      <GoogleSearchApiForm :researchPrompt="promptGoogleSearch" :visible="isGoogleSearchModalVisible"
        @close="closeModalGoogleSearch" @imageSelected="handleImageSelected" />

    </div>
  </div>

</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useBookStore } from '../store/bookStore';
import type { BookResponse } from '../model/BookResponse';
import bookService from '../service/BookService';
import themeService from '../service/ThemeService';
import ownerService from '../service/OwnerService';
import editorService from '../service/EditorService';
import libraryService from '../service/LibraryService';
import ImageUploader from '../components/ImageUploader.vue';
import EditorForm from '../components/EditorForm.vue';
import ThemeForm from '../components/ThemeForm.vue';
import OwnerForm from '../components/OwnerForm.vue';
import LibraryForm from '../components/LibraryForm.vue';
import NotationBookFormVue from '../components/NotationBookForm.vue';
import GoogleSearchApiForm from '../components/GoogleSearchApiForm.vue';
import router from '@/router';
import type { GetAllThemesResponse } from '../model/GetAllThemesResponse';
import type { GetAllOwnersResponse } from '../model/GetAllOwnersResponse';
import type { GetAllEditorsResponse } from '../model/GetAllEditorsResponse';
import type { GetAllLibrariesResponse } from '../model/GetAllLibrariesResponse';
import { EditorResponse } from '../model/EditorResponse';
import { OwnerResponse } from '../model/OwnerResponse';
import { ThemeResponse } from '../model/ThemeResponse';
import { LibraryResponse } from '../model/LibraryResponse';


export default defineComponent({
  name: 'BookForm.vue',
  components: {
    ImageUploader,
    EditorForm,
    OwnerForm,
    ThemeForm,
    LibraryForm,
    NotationBookFormVue,
    GoogleSearchApiForm
  },
  setup() {
    const isGoogleSearchModalVisible = ref(false);
    const openModalGoogleSearch = () => {
      isGoogleSearchModalVisible.value = true;
    };
    const closeModalGoogleSearch = () => {
      isGoogleSearchModalVisible.value = false;
    };

    const isModalLibraryVisible = ref(false);
    const openModalLibrary = () => {
      isModalLibraryVisible.value = true;
    };
    const closeModalLibrary = () => {
      isModalLibraryVisible.value = false;
    };

    const isModalNotationVisible = ref(false);
    const openModalNotation = () => {
      isModalNotationVisible.value = true;
    };
    const closeModalNotation = () => {
      isModalNotationVisible.value = false;
    };

    const isModalOwnerVisible = ref(false);
    const openModalOwner = () => {
      isModalOwnerVisible.value = true;
    };

    const closeModalOwner = () => {
      isModalOwnerVisible.value = false;
    };
    const isModalEditorVisible = ref(false);
    const openModalEditor = () => {
      isModalEditorVisible.value = true;
    };

    const closeModalEditor = () => {
      isModalEditorVisible.value = false;
    };

    const isModalThemeVisible = ref(false);
    const openModalTheme = () => {
      isModalThemeVisible.value = true;
    };

    const closeModalTheme = () => {
      isModalThemeVisible.value = false;
    };
    const themesResponse = ref<GetAllThemesResponse>({
      success: false,
      data: [],
    });
    const selectedThemes = ref<number[]>([]);
    const ownersResponse = ref<GetAllOwnersResponse>({
      success: false,
      data: [],
    });
    const selectedOwner = ref<String>('');
    const editorsResponse = ref<GetAllEditorsResponse>({
      success: false,
      data: [],
    });
    const selectedLibrary = ref<String>('');
    const librariesResponse = ref<GetAllLibrariesResponse>({
      success: false,
      data: [],
    });
    const selectedEditor = ref<String>('');
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
    const promptGoogleSearch = ref<String>('');

    const isEditMode = ref(false);
    const route = useRoute();

    const handleImageSelected = (link: string) => {
      book.value.coverPageUrl = link;
    };

    const handleFormSubmitAddLibrary = async (library: LibraryResponse) => {
      try {
        await libraryService.saveLibrary(library, false)
        const libraryRefetchResponse = await libraryService.fetchLibraries();
        if (libraryRefetchResponse.status === 200) {
          console.log("La bibliothèque à été ajoutée avec succès et la liste mise à jour.");
          librariesResponse.value = libraryRefetchResponse.data;
        } else {
          console.error(`Erreur lors de la récupération des bibliothèques du livre, statut : ${libraryRefetchResponse.status}`);
        }
        closeModalLibrary();
      } catch (error) {
        console.error('Error adding editor:', error);
      }
    };

    const handleFormSubmitAddEditor = async (editor: EditorResponse) => {
      try {
        await editorService.saveEditor(editor, false)
        const editorRefetchResponse = await editorService.fetchEditors();
        if (editorRefetchResponse.status === 200) {
          console.log("L'éditeur à été ajouté avec succès et la liste mise à jour.");
          editorsResponse.value = editorRefetchResponse.data;
        } else {
          console.error(`Erreur lors de la récupération des editeurs du livre, statut : ${editorRefetchResponse.status}`);
        }
        closeModalEditor();
      } catch (error) {
        console.error('Error adding editor:', error);
      }
    };

    const handleFormSubmitAddOwner = async (editor: OwnerResponse) => {
      try {
        await ownerService.saveOwner(editor, false)
        const ownersRefetchResponse = await ownerService.fetchOwners();
        if (ownersRefetchResponse.status === 200) {
          console.log("Le propriétaire à été ajouté avec succès et la liste mise à jour.");
          ownersResponse.value = ownersRefetchResponse.data;
        } else {
          console.error(`Erreur lors de la récupération des propriétaires du livre, statut : ${ownersRefetchResponse.status}`);
        }
        closeModalOwner();
      } catch (error) {
        console.error('Error adding owner:', error);
      }
    };

    const handleFormSubmitAddTheme = async (theme: ThemeResponse) => {
      try {
        await themeService.saveTheme(theme, false)
        const themesRefetchResponse = await themeService.fetchThemes();
        if (themesRefetchResponse.status === 200) {
          console.log("Le theme à été ajouté avec succès et la liste mise à jour.");
          themesResponse.value = themesRefetchResponse.data;
        } else {
          console.error(`Erreur lors de la récupération des thèmes, statut : ${themesRefetchResponse.status}`);
        }
        closeModalTheme();
      } catch (error) {
        console.error('Error adding theme:', error);
      }
    };

    onMounted(async () => {
      retrievesAllSubsidariesElement();
      if (bookStore.book) {
        book.value = bookStore.book;
        bookStore.clearBook();
        promptGoogleSearch.value = book.value.title + ', ' + book.value.authorName + ', ' + ( book.value.editor ? 'editeur : '+ book.value.editor.name + ', edition :' + book.value.editor.edition + ', ' + book.value.firstPublishYear : '');
      } else if (route.params.id) {
        // Fetch book by id if not coming from WebSocket
        isEditMode.value = true;
        try {
          const bookResponse = await bookService.getBookDetails(Number(route.params.id));
          if (bookResponse.status === 200) {
            book.value = bookResponse.data.data;
            //All values of select elements are set in the retrievesAllSubsidariesElement method
            //Selected elements need to be set
            selectedEditor.value = book.value.editor?.id;
            selectedOwner.value = book.value.owner?.id;
            selectedLibrary.value = book.value.library?.id
            selectedThemes.value = book.value.themes?.map(theme => theme.id);
            try {
              const bookCoverResponse = await bookService.getBookCover(Number(route.params.id));
              if (bookCoverResponse.status === 200) {
                console.log("La couverture du livre a été récupérée avec succès.");
                book.value.cover = URL.createObjectURL(bookCoverResponse.data);
              } else {
                console.error(`Erreur lors de la récupération de la couverture du livre, statut : ${bookCoverResponse.status}`);
              }
            } catch (error) {
              promptGoogleSearch.value = book.value.title + ', ' + book.value.authorName + ', ' + ( book.value.editor ? 'editeur : '+ book.value.editor.name + ', edition : ' + book.value.editor.edition + ', ' + book.value.firstPublishYear : '');
              console.error("Erreur lors de la recherche de la couverture:", error);
            }

          } else {
            console.error(`Erreur lors de la récupération du livre, statut : ${bookResponse.status}`);
          }
        } catch (error) {
          console.error("Erreur lors de l'appel du livre:", error);
        }
      }

    });

    const retrievesAllSubsidariesElement = async () => {
      try {
        const fetchAllThemesResponse = await themeService.fetchThemes();
        const fetchAllEditorsResponse = await editorService.fetchEditors();
        const fetchAllOwnersResponse = await ownerService.fetchOwners();
        const fetchAllLibrariesResponse = await libraryService.fetchLibraries();
        if (fetchAllThemesResponse.status == 200) {
          themesResponse.value = fetchAllThemesResponse.data;
        } else {
          console.error(`Erreur lors de la récupération des thèmes, statut : ${fetchAllThemesResponse.status}`);
        }
        if (fetchAllEditorsResponse.status == 200) {
          editorsResponse.value = fetchAllEditorsResponse.data;
        } else {
          console.error(`Erreur lors de la récupération des editeurs, statut : ${fetchAllEditorsResponse.status}`);
        }
        if (fetchAllOwnersResponse.status == 200) {
          ownersResponse.value = fetchAllOwnersResponse.data;
        } else {
          console.error(`Erreur lors de la récupération des propriétaires, statut : ${fetchAllOwnersResponse.status}`);
        }
        if (fetchAllLibrariesResponse.status == 200) {
          librariesResponse.value = fetchAllLibrariesResponse.data;

        } else {
          console.error(`Erreur lors de la récupération des bibliothèques, statut : ${fetchAllLibrariesResponse.status}`);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des éléments spécifique :", error);
      }
    }
    const saveBook = async () => {
      try {
        if (selectedThemes.value) {
          book.value.themes = selectedThemes.value.map(themeId => {
            const theme = themesResponse.value.data.find(t => t.id === themeId);
            return theme ? { id: theme.id, name: theme.name } : {};
          });
        }
        if (selectedOwner.value) {
          book.value.owner = ownersResponse.value.data.find(owner => owner.id === selectedOwner.value) || {};
        }
        if (selectedEditor.value) {
          book.value.editor = editorsResponse.value.data.find(editor => editor.id === selectedEditor.value) || {};
        }
        if (selectedLibrary.value) {
          book.value.library = librariesResponse.value.data.find(library => library.id === selectedLibrary.value) || {};
        }
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
      themesResponse,
      selectedThemes,
      ownersResponse,
      selectedOwner,
      editorsResponse,
      selectedEditor,
      librariesResponse,
      selectedLibrary,
      saveBook,
      deleteBook,
      isModalEditorVisible,
      openModalEditor,
      closeModalEditor,
      handleFormSubmitAddEditor,
      isModalOwnerVisible,
      openModalOwner,
      closeModalOwner,
      handleFormSubmitAddOwner,
      isModalThemeVisible,
      openModalTheme,
      closeModalTheme,
      handleFormSubmitAddTheme,
      openModalNotation,
      closeModalNotation,
      isModalNotationVisible,
      openModalLibrary,
      closeModalLibrary,
      isModalLibraryVisible,
      handleFormSubmitAddLibrary,
      isGoogleSearchModalVisible,
      openModalGoogleSearch,
      closeModalGoogleSearch,
      handleImageSelected,
      promptGoogleSearch
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

.custom-margin {
  margin: 10%;
  margin-left: 10%;
  margin-top: 0%;
}

.background-custom-color-form {
  background-color: #35495e;
}

.background-custom-color-button {
  background-color: #42b883;
}

.checkbox-custom-color {
  color: #42b883;
}
</style>
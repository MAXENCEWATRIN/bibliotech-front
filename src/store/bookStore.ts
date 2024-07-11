import { defineStore } from 'pinia';
import type { BookResponse } from '../model/BookResponse';

export const useBookStore = defineStore('bookStore', {
  state: () => ({
    book: null as BookResponse | null,
  }),
  actions: {
    setBook(newBook: BookResponse) { 
      this.book = newBook;
    },
    clearBook() {
      this.book = null;
    }
  }
});
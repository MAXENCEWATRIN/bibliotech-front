import apiBibliotechClient from '@/service/BibliotechApi';
import type { AxiosResponse } from 'axios';
import type { GetOneBookResponse } from '@/model/GetOneBookResponse';
import type { GetAllBooksResponse } from '@/model/GetAllBooksResponse';

export default {
  getBookCover(bookId: number): Promise<AxiosResponse<Blob>> {
    return apiBibliotechClient.get(`/books/${bookId}/cover`, {
      responseType: 'blob' 
    }).catch(function (error) {
      if (error.response && error.response.status === 404) {
        console.warn(`Le livre remonté n'avait pas de couverture, identifiant : ${bookId}`);
      } else {
        console.error(`Erreur lors de la récupération de la couverture du livre : ${error.message}`);
      }
      throw error;
    });
  },
  getBookDetails(bookId: number): Promise<AxiosResponse<GetOneBookResponse>> {
    return apiBibliotechClient.get(`/books/${bookId}`);
  },
  fetchBooks(): Promise<AxiosResponse<GetAllBooksResponse>> {
    return apiBibliotechClient.get(`/books`);
  },

  async saveBook(book: any, isEditMode: boolean): Promise<void> {
    try {
      if (isEditMode) {
        await apiBibliotechClient.put(`/books/${book.id}`, book);
      } else {
        await apiBibliotechClient.post('/books', book);
      }
    } catch (error) {
      console.error('Error saving book:', error);
      throw error;  
    }
  },

  async deleteBook(id: number): Promise<void> {
    try {
      await apiBibliotechClient.delete(`/books/${id}`);
    } catch (error) {
      console.error('Error deleting book:', error);
      throw error; 
    }
  }
};
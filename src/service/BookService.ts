import apiBibliotoClient from '@/service/BibliotoApi';
import type { AxiosResponse } from 'axios';
import type { GetOneBookResponse } from '@/model/GetOneBookResponse';
import type { GetAllBooksResponse } from '@/model/GetAllBooksResponse';

export default {
  getBookCover(bookId: number): Promise<AxiosResponse<Blob>> {
    return apiBibliotoClient.get(`/books/${bookId}/cover`, {
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
    return apiBibliotoClient.get(`/books/${bookId}`);
  },
  fetchBooks(): Promise<AxiosResponse<GetAllBooksResponse>> {
    return apiBibliotoClient.get(`/books`);
  },
};
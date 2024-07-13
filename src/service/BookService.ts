import apiBibliotoClient from '@/service/BibliotoApi';
import type { AxiosResponse } from 'axios';
import type { GetOneBookResponse } from '@/model/GetOneBookResponse';
import type { GetAllBooksResponse } from '@/model/GetAllBooksResponse';

export default {
  getBookCover(bookId: number): Promise<AxiosResponse<Blob>> {
    return apiBibliotoClient.get(`/books/${bookId}/cover`, {
      responseType: 'blob' 
    });
  },
  getBookDetails(bookId: number): Promise<AxiosResponse<GetOneBookResponse>> {
    return apiBibliotoClient.get(`/books/${bookId}`);
  },
  fetchBooks(): Promise<AxiosResponse<GetAllBooksResponse>> {
    return apiBibliotoClient.get(`/books`);
  },
};
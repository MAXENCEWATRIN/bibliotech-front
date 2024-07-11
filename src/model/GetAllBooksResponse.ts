import type { BookResponse } from './BookResponse';
  
  export interface GetAllBooksResponse {
    success: boolean;
    data: BookResponse[];
  }
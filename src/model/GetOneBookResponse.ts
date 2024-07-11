import type { BookResponse } from './BookResponse';
  
  export interface GetOneBookResponse {
    success: boolean;
    data: BookResponse;
  }
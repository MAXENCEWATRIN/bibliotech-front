import type { BookResponse } from './BookResponse';
  
  export interface GetOneBookRequest {
    success: boolean;
    data: BookResponse;
  }
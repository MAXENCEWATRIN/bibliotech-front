import type { BookResponse } from './BookResponse';
  
  export interface BibliotoBackResponsePattern {
    success: boolean;
    data: BookResponse[];
  }
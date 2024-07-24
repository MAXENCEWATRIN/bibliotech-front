import type { LibraryResponse } from './LibraryResponse';
  
  export interface GetOneLibraryResponse {
    success: boolean;
    data: LibraryResponse;
  }
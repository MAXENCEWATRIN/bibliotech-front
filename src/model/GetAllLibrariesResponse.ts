import type { LibraryResponse } from './LibraryResponse';
  
  export interface GetAllLibrariesResponse {
    success: boolean;
    data: LibraryResponse[];
  }
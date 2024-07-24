import { ThemeResponse } from './ThemeResponse';
  
  export interface GetAllThemesResponse {
    success: boolean;
    data: ThemeResponse[];
  }
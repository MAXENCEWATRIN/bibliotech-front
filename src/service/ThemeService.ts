import apiBibliotechClient from '@/service/BibliotechApi';
import type { AxiosResponse } from 'axios';
import type { GetOneThemeResponse } from '@/model/GetOneThemeResponse';
import type { GetAllThemesResponse } from '@/model/GetAllThemesResponse';

export default {
  getThemeDetails(bookId: number): Promise<AxiosResponse<GetOneThemeResponse>> {
    return apiBibliotechClient.get(`/themes/${bookId}`);
  },
  fetchThemes(): Promise<AxiosResponse<GetAllThemesResponse>> {
    return apiBibliotechClient.get(`/themes`);
  },

  async saveTheme(theme: any, isEditMode: boolean): Promise<void> {
    try {
      if (isEditMode) {
        await apiBibliotechClient.put(`/themes/${theme.id}`, theme);
      } else {
        await apiBibliotechClient.post('/themes', theme);
      }
    } catch (error) {
      console.error('Error saving theme:', error);
      throw error;  
    }
  },

  async deleteTheme(id: number): Promise<void> {
    try {
      await apiBibliotechClient.delete(`/themes/${id}`);
    } catch (error) {
      console.error('Error deleting theme:', error);
      throw error; 
    }
  }
};
import apiBibliotechClient from '@/service/BibliotechApi';
import type { AxiosResponse } from 'axios';
import type { GetOneLibraryResponse } from '@/model/GetOneLibraryResponse';
import type { GetAllLibrariesResponse } from '@/model/GetAllLibrariesResponse';

export default {
  getLibraryDetails(bookId: number): Promise<AxiosResponse<GetOneLibraryResponse>> {
    return apiBibliotechClient.get(`/libraries/${bookId}`);
  },
  fetchLibraries(): Promise<AxiosResponse<GetAllLibrariesResponse>> {
    return apiBibliotechClient.get(`/libraries`);
  },

  saveLibrary(library: any, isEditMode: boolean): Promise<AxiosResponse<GetOneLibraryResponse>> {
    try {
      if (isEditMode) {
      return  apiBibliotechClient.put(`/libraries/${library.id}`, library);
      } else {
       return apiBibliotechClient.post('/libraries', library);
      }
    } catch (error) {
      console.error('Error saving library:', error);
      throw error;  
    }
  },

  async deleteLibrary(id: number): Promise<void> {
    try {
      await apiBibliotechClient.delete(`/libraries/${id}`);
    } catch (error) {
      console.error('Error deleting library:', error);
      throw error; 
    }
  }
};
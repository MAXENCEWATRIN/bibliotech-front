import apiBibliotechClient from '@/service/BibliotechApi';
import type { AxiosResponse } from 'axios';
import type { GetOneOwnerRequest } from '@/model/GetOneOwnerRequest';
import type { GetAllOwnersResponse } from '@/model/GetAllOwnersResponse';

export default {
  getOwnerDetails(bookId: number): Promise<AxiosResponse<GetOneOwnerRequest>> {
    return apiBibliotechClient.get(`/owners/${bookId}`);
  },
  fetchOwners(): Promise<AxiosResponse<GetAllOwnersResponse>> {
    return apiBibliotechClient.get(`/owners`);
  },

  async saveOwner(theme: any, isEditMode: boolean): Promise<void> {
    try {
      if (isEditMode) {
        await apiBibliotechClient.put(`/owners/${theme.id}`, theme);
      } else {
        await apiBibliotechClient.post('/owners', theme);
      }
    } catch (error) {
      console.error('Error saving owner:', error);
      throw error;  
    }
  },

  async deleteOwner(id: number): Promise<void> {
    try {
      await apiBibliotechClient.delete(`/owners/${id}`);
    } catch (error) {
      console.error('Error deleting owner:', error);
      throw error; 
    }
  }
};
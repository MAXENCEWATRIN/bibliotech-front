import apiBibliotechClient from '@/service/BibliotechApi';
import type { AxiosResponse } from 'axios';
import type { GetOneOwnerResponse } from '@/model/GetOneOwnerResponse';
import type { GetAllOwnersResponse } from '@/model/GetAllOwnersResponse';

export default {
  getOwnerDetails(bookId: number): Promise<AxiosResponse<GetOneOwnerResponse>> {
    return apiBibliotechClient.get(`/owners/${bookId}`);
  },
  fetchOwners(): Promise<AxiosResponse<GetAllOwnersResponse>> {
    return apiBibliotechClient.get(`/owners`);
  },

  saveOwner(theme: any, isEditMode: boolean): Promise<AxiosResponse<GetOneOwnerResponse>> {
    try {
      if (isEditMode) {
      return  apiBibliotechClient.put(`/owners/${theme.id}`, theme);
      } else {
        return  apiBibliotechClient.post('/owners', theme);
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
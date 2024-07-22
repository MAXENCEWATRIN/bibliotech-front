import apiBibliotechClient from '@/service/BibliotechApi';
import type { AxiosResponse } from 'axios';
import type { GetOneEditorResponse } from '@/model/GetOneEditorResponse';
import type { GetAllEditorsResponse } from '@/model/GetAllEditorsResponse';

export default {
  getEditorDetails(bookId: number): Promise<AxiosResponse<GetOneEditorResponse>> {
    return apiBibliotechClient.get(`/editors/${bookId}`);
  },
  fetchEditors(): Promise<AxiosResponse<GetAllEditorsResponse>> {
    return apiBibliotechClient.get(`/editors`);
  },

  async saveEditor(editor: any, isEditMode: boolean): Promise<void> {
    try {
      if (isEditMode) {
        await apiBibliotechClient.put(`/editors/${editor.id}`, editor);
      } else {
        await apiBibliotechClient.post('/editors', editor);
      }
    } catch (error) {
      console.error('Error saving editor:', error);
      throw error;  
    }
  },

  async deleteEditor(id: number): Promise<void> {
    try {
      await apiBibliotechClient.delete(`/editors/${id}`);
    } catch (error) {
      console.error('Error deleting editor:', error);
      throw error; 
    }
  }
};
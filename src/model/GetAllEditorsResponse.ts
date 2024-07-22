import type { EditorResponse } from './EditorResponse';
  
  export interface GetAllEditorsResponse {
    success: boolean;
    data: EditorResponse[];
  }
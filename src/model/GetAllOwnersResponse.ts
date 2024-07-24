import type { OwnerResponse } from './OwnerResponse';
  
  export interface GetAllOwnersResponse {
    success: boolean;
    data: OwnerResponse[];
  }
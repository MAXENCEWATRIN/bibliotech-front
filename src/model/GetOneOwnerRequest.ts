import type { OwnerResponse } from './OwnerResponse';
  
  export interface GetOneOwnerRequest {
    success: boolean;
    data: OwnerResponse;
  }
/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_CUSTOM_SEARCH_GOOGLE_KEY: string;
    readonly VITE_API_CUSTOM_SEARCH_GOOGLE_URL: string;
    readonly VITE_API_CUSTOM_SEARCH_GOOGLE_ENGINE_ID: string;
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
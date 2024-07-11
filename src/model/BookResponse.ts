import type { EditorResponse } from './EditorResponse';
import type { LibraryResponse } from './LibraryResponse';
import type { ThemeResponse } from './ThemeResponse';
import type { OwnerResponse } from './OwnerResponse';
  
  export interface BookResponse {
    id: number;
    isbnId: number;
    oldIsbnId: number;
    title: string;
    authorName: string;
    titleLong: string;
    subtitle: string;
    synopsis: string;
    summary: string;
    numberOfPage: number;
    openLibraryId: string;
    coverPageUrl: string;
    traductionLanguage: string;
    initialLanguage: string;
    firstPublishYear: number;
    firstSentence: string;
    editor: EditorResponse;
    library: LibraryResponse;
    themes: ThemeResponse[];
    owner: OwnerResponse;
    isWishList: boolean;
    overallReception: string;
    praises: string;
    criticisms: string;
    isAnOpenLibaryApiRegister: boolean;
    isAnOpenLibaryApiBookValidate: boolean;
  }
  
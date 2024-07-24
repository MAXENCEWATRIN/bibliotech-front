import type { EditorResponse } from './EditorResponse'
import type { LibraryResponse } from './LibraryResponse'
import type { ThemeResponse } from './ThemeResponse'
import type { OwnerResponse } from './OwnerResponse'

export interface BookResponse {
  id: number | null
  isbnId: number | null
  oldIsbnId: number | null
  title: string
  authorName: string
  titleLong: string | null
  subtitle: string | null
  synopsis: string | null
  summary: string | null
  numberOfPage: number
  openLibraryId: string | null
  coverPageUrl: string | null
  cover: Blob | null
  coverImageId: String | null
  traductionLanguage: string | null
  initialLanguage: string
  firstPublishYear: number | null
  firstSentence: string | null
  editor: EditorResponse | null
  library: LibraryResponse | null
  themes: ThemeResponse[] | null
  owner: OwnerResponse | null
  isWishList: boolean | null
  overallReception: string | null
  praises: string | null
  criticisms: string | null
  isAnOpenLibaryApiRegister: boolean | null
  isAnOpenLibaryApiBookValidate: boolean | null
}

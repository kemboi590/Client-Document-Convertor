export interface ConversionResult {
    success: boolean;
    blob?: Blob;
    fileName?: string;
    error?: string;
}

export interface SupportedFormatsResponse {
    sourceFormats: string[];
    targetFormats: string[];
}

export const ALLOWED_WORD_EXTENSIONS = ['.doc', '.docx'] as const;
export const ALLOWED_WORD_MIME_TYPES = [
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
] as const;

export const ALLOWED_PDF_EXTENSIONS = ['.pdf'] as const;
export const ALLOWED_PDF_MIME_TYPES = ['application/pdf'] as const;

export type AllowedWordExtension = (typeof ALLOWED_WORD_EXTENSIONS)[number];
export type AllowedPdfExtension = (typeof ALLOWED_PDF_EXTENSIONS)[number];

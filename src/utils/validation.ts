import { ALLOWED_WORD_EXTENSIONS, ALLOWED_WORD_MIME_TYPES } from '../types/document';

export interface ValidationResult {
    valid: boolean;
    error?: string;
}

/**
 * Validates if a file is a valid Word document
 */
export function validateWordDocument(file: File | null): ValidationResult {
    if (!file) {
        return { valid: false, error: 'Please select a file' };
    }

    // Check file size (max 50MB to match backend limit)
    const maxSizeBytes = 50 * 1024 * 1024;
    if (file.size > maxSizeBytes) {
        return { valid: false, error: 'File size must be less than 50MB' };
    }

    if (file.size === 0) {
        return { valid: false, error: 'File is empty' };
    }

    // Check file extension
    const fileName = file.name.toLowerCase();
    const hasValidExtension = ALLOWED_WORD_EXTENSIONS.some(ext => fileName.endsWith(ext));

    if (!hasValidExtension) {
        return {
            valid: false,
            error: `Invalid file format. Allowed formats: ${ALLOWED_WORD_EXTENSIONS.join(', ')}`,
        };
    }

    // Check MIME type (as additional validation)
    const hasValidMimeType = ALLOWED_WORD_MIME_TYPES.includes(
        file.type as (typeof ALLOWED_WORD_MIME_TYPES)[number]
    );

    // Some browsers might not set the correct MIME type, so we allow if extension is valid
    if (file.type && !hasValidMimeType) {
        console.warn(`File has unexpected MIME type: ${file.type}, but extension is valid`);
    }

    return { valid: true };
}

/**
 * Formats file size to human readable string
 */
export function formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

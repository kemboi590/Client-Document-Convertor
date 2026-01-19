import type { ConversionResult, SupportedFormatsResponse } from '../types/document';

// Use empty string for proxy in development, or explicit URL for production
const API_BASE_URL = import.meta.env.VITE_API_URL || '';

export const documentApi = {
    /**
     * Convert a Word document to PDF
     */
    async convertToPdf(file: File): Promise<ConversionResult> {
        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await fetch(`${API_BASE_URL}/api/document/convert`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => null);
                return {
                    success: false,
                    error: errorData?.detail || errorData?.title || 'Conversion failed',
                };
            }

            const blob = await response.blob();
            const contentDisposition = response.headers.get('Content-Disposition');
            let fileName = 'converted.pdf';

            if (contentDisposition) {
                const fileNameMatch = contentDisposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
                if (fileNameMatch && fileNameMatch[1]) {
                    fileName = fileNameMatch[1].replace(/['"]/g, '');
                }
            }

            return {
                success: true,
                blob,
                fileName,
            };
        } catch (error) {
            return {
                success: false,
                error: error instanceof Error ? error.message : 'An unexpected error occurred',
            };
        }
    },

    /**
     * Get supported conversion formats
     */
    async getSupportedFormats(): Promise<SupportedFormatsResponse | null> {
        try {
            const response = await fetch(`${API_BASE_URL}/api/document/formats`);
            if (!response.ok) {
                return null;
            }
            return await response.json();
        } catch {
            return null;
        }
    },
};

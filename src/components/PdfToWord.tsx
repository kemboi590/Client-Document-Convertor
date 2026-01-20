import { useState, useRef, type DragEvent, type ChangeEvent } from 'react';
import { documentApi } from '../api/documentApi';
import { validatePdfDocument, formatFileSize } from '../utils/validation';
import { ALLOWED_PDF_EXTENSIONS } from '../types/document';

type ConversionStatus = 'idle' | 'validating' | 'converting' | 'success' | 'error';
type TargetFormat = 'docx' | 'doc';

export function PdfToWord() {
    const [file, setFile] = useState<File | null>(null);
    const [status, setStatus] = useState<ConversionStatus>('idle');
    const [error, setError] = useState<string | null>(null);
    const [isDragOver, setIsDragOver] = useState(false);
    const [targetFormat, setTargetFormat] = useState<TargetFormat>('docx');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = (selectedFile: File | null) => {
        setError(null);
        setStatus('idle');

        if (!selectedFile) {
            setFile(null);
            return;
        }

        setStatus('validating');
        const validation = validatePdfDocument(selectedFile);

        if (!validation.valid) {
            setError(validation.error || 'Invalid file');
            setStatus('error');
            setFile(null);
            return;
        }

        setFile(selectedFile);
        setStatus('idle');
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0] || null;
        handleFileSelect(selectedFile);
    };

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragOver(false);
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragOver(false);

        const droppedFile = e.dataTransfer.files[0] || null;
        handleFileSelect(droppedFile);
    };

    const handleConvert = async () => {
        if (!file) {
            setError('Please select a file first');
            return;
        }

        setStatus('converting');
        setError(null);

        const result = await documentApi.convertToWord(file, targetFormat);

        if (result.success && result.blob) {
            setStatus('success');

            // Create download link
            const url = URL.createObjectURL(result.blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = result.fileName || `converted.${targetFormat}`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        } else {
            setStatus('error');
            setError(result.error || 'Conversion failed');
        }
    };

    const handleReset = () => {
        setFile(null);
        setStatus('idle');
        setError(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleBrowseClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="w-full max-w-2xl mx-auto p-6">
            <div className="bg-white rounded-2xl shadow-xl p-8">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                        <svg
                            className="w-8 h-8 text-red-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                            />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">PDF to Word Converter</h2>
                    <p className="text-gray-500 mt-2">
                        Convert your PDF documents to Word format (.docx, .doc)
                    </p>
                </div>

                {/* Target Format Selector */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Output Format
                    </label>
                    <div className="flex gap-4">
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="targetFormat"
                                value="docx"
                                checked={targetFormat === 'docx'}
                                onChange={() => setTargetFormat('docx')}
                                className="w-4 h-4 text-red-600 border-gray-300 focus:ring-red-500"
                            />
                            <span className="ml-2 text-gray-700">.docx (Word 2007+)</span>
                        </label>
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="targetFormat"
                                value="doc"
                                checked={targetFormat === 'doc'}
                                onChange={() => setTargetFormat('doc')}
                                className="w-4 h-4 text-red-600 border-gray-300 focus:ring-red-500"
                            />
                            <span className="ml-2 text-gray-700">.doc (Word 97-2003)</span>
                        </label>
                    </div>
                </div>

                {/* Drop Zone */}
                <div
                    onClick={handleBrowseClick}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`
            relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer
            transition-all duration-200 ease-in-out
            ${isDragOver
                            ? 'border-red-500 bg-red-50'
                            : file
                                ? 'border-green-400 bg-green-50'
                                : 'border-gray-300 hover:border-red-400 hover:bg-gray-50'
                        }
          `}
                >
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept={ALLOWED_PDF_EXTENSIONS.join(',')}
                        onChange={handleInputChange}
                        className="hidden"
                    />

                    {file ? (
                        <div className="space-y-2">
                            <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full">
                                <svg
                                    className="w-6 h-6 text-green-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                            </div>
                            <p className="font-medium text-gray-800">{file.name}</p>
                            <p className="text-sm text-gray-500">{formatFileSize(file.size)}</p>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full">
                                <svg
                                    className="w-6 h-6 text-gray-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                    />
                                </svg>
                            </div>
                            <p className="font-medium text-gray-700">
                                Drop your PDF file here, or <span className="text-red-600">browse</span>
                            </p>
                            <p className="text-sm text-gray-500">Supports: .pdf (Max 50MB)</p>
                        </div>
                    )}
                </div>

                {/* Error Message */}
                {error && (
                    <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                        <div className="flex items-center gap-2">
                            <svg
                                className="w-5 h-5 text-red-500 shrink-0"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            <p className="text-red-700 text-sm">{error}</p>
                        </div>
                    </div>
                )}

                {/* Success Message */}
                {status === 'success' && (
                    <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center gap-2">
                            <svg
                                className="w-5 h-5 text-green-500 shrink-0"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            <p className="text-green-700 text-sm">
                                Conversion successful! Your Word document has been downloaded.
                            </p>
                        </div>
                    </div>
                )}

                {/* Action Buttons */}
                <div className="mt-6 flex gap-3">
                    <button
                        onClick={handleConvert}
                        disabled={!file || status === 'converting'}
                        className={`
              flex-1 py-3 px-6 rounded-xl font-semibold text-white
              transition-all duration-200 ease-in-out
              flex items-center justify-center gap-2
              ${!file || status === 'converting'
                                ? 'bg-gray-300 cursor-not-allowed'
                                : 'bg-red-600 hover:bg-red-700 active:scale-[0.98]'
                            }
            `}
                    >
                        {status === 'converting' ? (
                            <>
                                <svg
                                    className="animate-spin w-5 h-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    />
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    />
                                </svg>
                                Converting...
                            </>
                        ) : (
                            <>
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                    />
                                </svg>
                                Convert to Word
                            </>
                        )}
                    </button>

                    {file && (
                        <button
                            onClick={handleReset}
                            disabled={status === 'converting'}
                            className="py-3 px-6 rounded-xl font-semibold text-gray-700 bg-gray-100 
                         hover:bg-gray-200 transition-all duration-200 ease-in-out
                         disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Clear
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

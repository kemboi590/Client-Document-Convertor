import { useState } from 'react';
import { WordToPdf } from '../src/components/WordToPdf';
import { PdfToWord } from '../src/components/PdfToWord';

type ConversionTab = 'word-to-pdf' | 'pdf-to-word';

export function HomePage() {
    const [activeTab, setActiveTab] = useState<ConversionTab>('word-to-pdf');

    return (
        <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50">
            {/* Header */}
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                                <svg
                                    className="w-6 h-6 text-white"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                                    />
                                </svg>
                            </div>
                            <h1 className="text-xl font-bold text-gray-900">Document Converter</h1>
                        </div>
                        <nav className="flex items-center gap-6">
                            <button
                                onClick={() => setActiveTab('word-to-pdf')}
                                className={`font-medium transition-colors ${activeTab === 'word-to-pdf'
                                        ? 'text-blue-600'
                                        : 'text-gray-600 hover:text-blue-600'
                                    }`}
                            >
                                Word to PDF
                            </button>
                            <button
                                onClick={() => setActiveTab('pdf-to-word')}
                                className={`font-medium transition-colors ${activeTab === 'pdf-to-word'
                                        ? 'text-red-600'
                                        : 'text-gray-600 hover:text-red-600'
                                    }`}
                            >
                                PDF to Word
                            </button>
                        </nav>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                        Convert Documents with Ease
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Fast, secure, and reliable document conversion. Transform your documents
                        between Word and PDF formats instantly.
                    </p>
                </div>

                {/* Tab Buttons */}
                <div className="flex justify-center mb-8">
                    <div className="inline-flex bg-gray-100 rounded-xl p-1">
                        <button
                            onClick={() => setActiveTab('word-to-pdf')}
                            className={`px-6 py-2 rounded-lg font-medium transition-all ${activeTab === 'word-to-pdf'
                                    ? 'bg-white text-blue-600 shadow-sm'
                                    : 'text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            Word → PDF
                        </button>
                        <button
                            onClick={() => setActiveTab('pdf-to-word')}
                            className={`px-6 py-2 rounded-lg font-medium transition-all ${activeTab === 'pdf-to-word'
                                    ? 'bg-white text-red-600 shadow-sm'
                                    : 'text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            PDF → Word
                        </button>
                    </div>
                </div>

                {/* Conversion Component */}
                {activeTab === 'word-to-pdf' ? <WordToPdf /> : <PdfToWord />}

                {/* Features Section */}
                <div className="mt-16 grid md:grid-cols-3 gap-8">
                    <div className="text-center p-6">
                        <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-xl mb-4">
                            <svg
                                className="w-6 h-6 text-blue-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M13 10V3L4 14h7v7l9-11h-7z"
                                />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Lightning Fast</h3>
                        <p className="text-gray-600">
                            Convert your documents in seconds with our optimized conversion engine.
                        </p>
                    </div>

                    <div className="text-center p-6">
                        <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-xl mb-4">
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
                                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Secure</h3>
                        <p className="text-gray-600">
                            Your files are processed securely and never stored on our servers.
                        </p>
                    </div>

                    <div className="text-center p-6">
                        <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-xl mb-4">
                            <svg
                                className="w-6 h-6 text-purple-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"
                                />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">No Limits</h3>
                        <p className="text-gray-600">
                            Convert files up to 50MB with no restrictions on the number of conversions.
                        </p>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-gray-50 border-t border-gray-200 mt-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <p className="text-center text-gray-500 text-sm">
                        © {new Date().getFullYear()} Document Converter. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
}

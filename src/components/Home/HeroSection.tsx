import React from 'react';
import Link from 'next/link';

export default function HeroSection() {
    return (
        <div className="bg-gradient-to-br h-[92vh] from-primary-800 via-primary-700 to-primary-600 text-white flex items-center justify-center">
            <div className="px-6 py-24">
                <div className="flex flex-col items-center justify-center text-center">
                    <div className="max-w-3xl">
                        <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                            Smart Title Verification System
                        </h1>
                        <p className="text-lg mb-8 text-gray-200">
                            Ensure unique and compliant titles with our advanced AI-powered verification system.
                            Leveraging multiple algorithms for accurate similarity detection.
                        </p>
                        <div className="flex gap-4 justify-center">
                            <Link
                                href="/auth/signup"
                                className="bg-accent-500 hover:bg-accent-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                            >
                                Try Verification
                            </Link>
                            <Link
                                href="/demo"
                                className="border border-white hover:bg-white hover:text-primary-700 px-8 py-3 rounded-lg font-semibold transition-colors"
                            >
                                View Documentation
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

"use client";
import React, { useState } from 'react';
import { getBackendUrl } from '@/utils/getBackendUrl';

interface ApiResponse {
    status: string;
    input_title: string;
    isValid: boolean;
    invalid_words?: string[];
    message?: string;
    error?: string;
}

interface TestCase {
    id: number;
    title: string;
    status: 'idle' | 'running' | 'success' | 'failed';
    endpoint: string;
    method: string;
    response?: ApiResponse;
}

const TitleVerification = () => {
    const [title, setTitle] = useState("");
    const [testCases, setTestCases] = useState<TestCase[]>([
        {
            id: 1,
            title: "Check Min Word", 
            status: 'idle',
            endpoint: '/check_min_word',
            method: 'POST'
        },
        {
            id: 2,
            title: "Check Special Character",
            status: 'idle',
            endpoint: '/check_spec_char', 
            method: 'POST'
        },
        {
            id: 3,
            title: "Restricted Words Check",
            status: 'idle',
            endpoint: '/restricted_words/check',
            method: 'POST'
        },
        {
            id: 4,
            title: "Prefix Suffix Check", 
            status: 'idle',
            endpoint: '/restricted_check/check',
            method: 'POST'
        },
        {
            id: 5,
            title: "Space No-Space Check",
            status: 'idle',
            endpoint: '/title_combination/space_nospace',
            method: 'GET'
        },
        {
            id: 6,
            title: "Title Combination Check",
            status: 'idle',
            endpoint: '/title_combination/',
            method: 'GET'
        }
    ]);
    

    const verifyTitle = async () => {
        if (!title.trim()) return;

        // Set all test cases to running
        setTestCases(prev => prev.map(test => ({ ...test, status: 'running' })));

        const backendUrl = getBackendUrl();

        const apiCalls = testCases.map(async (test) => {
            try {
                let response;
                if (test.method === 'GET') {
                    response = await fetch(`${backendUrl}${test.endpoint}?title=${encodeURIComponent(title)}`);
                } else if (test.method === 'POST') {
                    response = await fetch(`${backendUrl}${test.endpoint}?title=${encodeURIComponent(title)}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                    });
                }
                const data: ApiResponse = await response!.json();
                console.log(data);
                return {
                    id: test.id,
                    status: data.isValid ? 'success' : 'failed',
                    response: data
                };
            } catch (_error) {
                return {
                    id: test.id,
                    status: 'failed',
                    response: {
                        status: 'error',
                        input_title: title,
                        isValid: false,
                        message: (_error as Error).message
                    }
                };
            }
        });

        const results = await Promise.all(apiCalls);

        setTestCases(prev => prev.map(test => {
            const result = results.find(r => r.id === test.id);
            return {
                ...test,
                status: result?.status as TestCase['status'],
                response: result?.response
            };
        }));
    };

    const getStatusColor = (status: TestCase['status']) => {
        switch (status) {
            case 'running': return 'bg-yellow-100 text-yellow-800';
            case 'success': return 'bg-green-100 text-green-800';
            case 'failed': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const renderResponseDetails = (test: TestCase) => {
        if (!test.response) return null;

        return (
            <div className="mt-3 text-sm space-y-2">
                {test.response.invalid_words && test.response.invalid_words.length > 0 && (
                    <div className="text-red-600">
                        <span className="font-semibold">Invalid Words: </span>
                        {test.response.invalid_words.join(', ')}
                    </div>
                )}
                {test.response.message && (
                    <div className={`${test.status==="success" ? " text-gray-700" : "text-red-600"} `}>
                        <span className="font-semibold">Message: </span>
                        {test.response.message}
                    </div>
                )}
                {test.response.error && (
                    <div className="text-red-600">
                        <span className="font-semibold">Error: </span>
                        {test.response.error}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="w-full h-[90vh] p-8">
            <div className="flex h-full flex-col md:flex-row gap-8">
                {/* Left Section - Input */}
                <div className="md:w-1/2 h-full flex flex-col justify-around items-center">
                    <div className="bg-white p-6 w-[80%] rounded-lg shadow-lg border border-primary-100">
                        <h2 className="text-2xl font-bold mb-6 text-primary-700">Title Verification</h2>
                        <div className="space-y-4">
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Enter title to verify"
                                className="w-full p-3 border border-primary-200 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-400 text-gray-600"
                            />
                            <button
                                onClick={verifyTitle}
                                className="w-full p-3 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors duration-200"
                            >
                                Verify Title
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Section - Test Cases */}
                <div className="md:w-1/2 h-full flex flex-col justify-center items-center">
                    <div className="space-y-4 w-full">
                        {testCases.map((test) => (
                            <div key={test.id} className="border border-primary-100 rounded-lg p-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-primary-800 font-semibold">{test.title}</span>
                                    {test.status === 'running' ? (
                                        <div className="flex items-center gap-2">
                                            <div className="w-4 h-4 border-2 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
                                            <span className="uppercase font-semibold text-sm text-primary-600">
                                                Running
                                            </span>
                                        </div>
                                    ) : (
                                        <span className={`px-3 py-1 rounded-full text-sm uppercase font-semibold ${getStatusColor(test.status)}`}>
                                            {test.status}
                                        </span>
                                    )}
                                </div>
                                {test.status !== 'idle' && test.status !== 'running' && renderResponseDetails(test)}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TitleVerification;

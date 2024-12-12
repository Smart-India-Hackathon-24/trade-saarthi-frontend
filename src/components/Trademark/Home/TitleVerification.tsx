"use client";
import React, { useState } from 'react';
import { getBackendUrl } from '@/utils/getBackendUrl';
import { motion, AnimatePresence } from 'framer-motion';

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

interface AccordionSection {
    id: number;
    title: string;
    testCases: TestCase[];
}

const TitleVerification = () => {
    const [title, setTitle] = useState("");
    const [report, setReport] = useState("");
    const [openSections, setOpenSections] = useState<number[]>([]);

    const accordionSections: AccordionSection[] = [
        {
            id: 1,
            title: "Invalid Title Name Check",
            testCases: [
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
            ]
        },
        {
            id: 2,
            title: "Similarities Check",
            testCases: [
                {
                    id: 7,
                    title: "Same Title Check",
                    status: 'idle',
                    endpoint: '/dummy',
                    method: 'GET'
                },
                {
                    id: 8,
                    title: "Similar Title Check",
                    status: 'idle',
                    endpoint: '/dummy',
                    method: 'GET'
                }
                , {
                    id: 9,
                    title: "Sound Similar Title Check",
                    status: 'idle',
                    endpoint: '/dummy',
                    method: 'GET'
                }
            ]
        }
    ];

    const [sections, setSections] = useState(accordionSections);
    const backendUrl = getBackendUrl();

    const verifyTitle = async () => {
        if (!title.trim()) return;
        setReport("");

        setSections(prev => prev.map(section => ({
            ...section,
            testCases: section.testCases.map(test => ({ ...test, status: 'running' }))
        })));

        for (const section of sections) {
            const apiCalls = section.testCases.map(async (test) => {
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
            setSections(prev => prev.map(s => {
                if (s.id === section.id) {
                    return {
                        ...s,
                        testCases: s.testCases.map(test => {
                            const result = results.find(r => r.id === test.id);
                            return {
                                ...test,
                                status: result?.status as TestCase['status'],
                                response: result?.response
                            };
                        })
                    };
                }
                return s;
            }));
        }

        getReportDetails(title);
    };

    const getStatusColor = (status: TestCase['status']) => {
        switch (status) {
            case 'running': return 'text-yellow-800 border-yellow-800 bg-yellow-100';
            case 'success': return 'text-green-800 border-green-800 bg-green-100';
            case 'failed': return 'text-red-800 border-red-800 bg-red-100';
            default: return 'text-gray-800 border-gray-800 bg-gray-100';
        }
    };

    const renderResponseDetails = (test: TestCase) => {
        if (!test.response) return null;

        return (
            <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-3 text-sm space-y-2"
            >
                {test.response.invalid_words && test.response.invalid_words.length > 0 && (
                    <div className="text-red-600">
                        <span className="font-semibold">Invalid Words: </span>
                        {test.response.invalid_words.join(', ')}
                    </div>
                )}
                {test.response.message && (
                    <div className={`${test.status === "success" ? "text-gray-700" : "text-red-600"}`}>
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
            </motion.div>
        );
    };

    const getReportDetails = async (title: string) => {
        const response = await fetch(`${backendUrl}/get_report?title=${encodeURIComponent(title)}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const data = await response!.json();
        setReport(data[0]?.final_output);
    }

    const toggleSection = (sectionId: number) => {
        setOpenSections(prev => {
            if (prev.includes(sectionId)) {
                return prev.filter(id => id !== sectionId);
            } else {
                return [...prev, sectionId];
            }
        });
    };

    return (
        <div className="w-full h-[90vh] p-6">
            <div className="flex flex-col h-full md:flex-row">
                {/* Left Section - Input */}
                <div className="md:w-1/2 flex flex-1 p-4 flex-col justify-center items-center overflow-y-auto">
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

                {/* Right Section - Accordion */}
                <div className="md:w-1/2 flex-1 p-4 overflow-y-auto">
                    <div className="space-y-4">
                        {sections.map((section) => (
                            <motion.div
                                key={section.id}
                                className={`rounded-lg shadow-md overflow-hidden
                                    ${openSections.includes(section.id) ? 'bg-primary-100' : 'bg-white'}`}
                                layout
                            >
                                <button
                                    className="w-full p-4 text-left font-semibold text-primary-800 flex justify-between items-center"
                                    onClick={() => toggleSection(section.id)}
                                >
                                    {section.title}
                                    <span className="text-xl font-bold">
                                        {openSections.includes(section.id) ? '-' : '+'}
                                    </span>
                                </button>

                                <AnimatePresence mode="wait">
                                    {openSections.includes(section.id) && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="px-4 pb-4"
                                        >
                                            {section.testCases.map((test) => (
                                                <motion.div
                                                    key={test.id}
                                                    className={`border rounded-lg p-4 mb-2 ${test.status === 'running' ? 'bg-yellow-50' :
                                                        test.status === 'success' ? 'bg-green-50' :
                                                            test.status === 'failed' ? 'bg-red-50' : 'bg-white'}`}
                                                    layout
                                                >
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
                                                            <span className={`px-3 py-1 rounded-full text-sm font-bold border ${getStatusColor(test.status)}`}>
                                                                {test.status === 'success' ? '100%' : '0%'}
                                                            </span>
                                                        )}
                                                    </div>
                                                    {test.status !== 'idle' && test.status !== 'running' && renderResponseDetails(test)}
                                                </motion.div>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {report && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                    >
                        <h1 className='text-7xl text-center text-primary-600 my-8 font-bold uppercase'>
                            Report:
                        </h1>
                        <div className='border-2 border-gray-700 text-lg rounded-lg px-6 my-2 py-2 text-center w-10/12 mx-auto'>
                            <p>{report}</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default TitleVerification;

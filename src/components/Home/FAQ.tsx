"use client"
import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const faqItems = [
        {
            question: "How does the title verification system work?",
            answer: "Our system uses multiple algorithms including Metaphone, NYSIIS, and various similarity checks to verify title uniqueness and compliance. It analyzes phonetic similarity, transliteration, and performs fuzzy matching to ensure comprehensive verification."
        },
        {
            question: "What is the probability score?",
            answer: "The probability score is a numerical indicator (0-100%) that represents the likelihood of a title being accepted or rejected. It's calculated based on multiple factors including similarity to existing titles and compliance with predefined rules."
        },
        {
            question: "How does the caching system improve performance?",
            answer: "We use Redis as a caching layer to store recent verification results. This significantly reduces response times for frequently checked titles and decreases the load on our main server."
        },
        {
            question: "What types of rules can be configured?",
            answer: "You can configure rules for disallowed words, prefixes, suffixes, and set similarity thresholds. The system is highly customizable to match your specific requirements."
        },
        {
            question: "How accurate is the verification system?",
            answer: "Our system achieves high accuracy by combining multiple verification techniques. The probability score helps users make informed decisions about title acceptance."
        }
    ];

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-6">
                <motion.div 
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Got questions? We&apos;ve got answers! Here are some of the most common questions we receive.
                    </p>
                </motion.div>

                <div className="max-w-3xl mx-auto">
                    {faqItems.map((item, index) => (
                        <motion.div 
                            key={index} 
                            className="mb-4 border-b border-gray-200 last:border-b-0"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <button
                                className="w-full flex justify-between items-center py-4 text-left"
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                            >
                                <span className="text-lg font-semibold text-gray-900">
                                    {item.question}
                                </span>
                                {openIndex === index ? 
                                    <FaChevronUp className="text-gray-500" /> : 
                                    <FaChevronDown className="text-gray-500" />
                                }
                            </button>
                            <AnimatePresence mode="wait">
                                {openIndex === index && (
                                    <motion.div 
                                        initial={{ height: 0, opacity: 0, y: -10 }}
                                        animate={{ height: "auto", opacity: 1, y: 0 }}
                                        exit={{ height: 0, opacity: 0, y: -10 }}
                                        transition={{ 
                                            duration: 0.3,
                                            opacity: { duration: 0.2 },
                                            height: { duration: 0.3 }
                                        }}
                                        className="pb-4 text-gray-600"
                                    >
                                        {item.answer}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

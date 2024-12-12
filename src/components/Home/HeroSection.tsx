"use client"
import React from 'react';
import Link from 'next/link';
import { TypeAnimation } from 'react-type-animation';
import { motion } from 'framer-motion';

export default function HeroSection() {
    return (
        <div className="bg-gradient-to-br h-[92vh] from-primary-400 via-primary-500 to-primary-800 text-white flex items-center justify-center">
            <div className="px-6 py-24">
                <div className="flex flex-col items-center justify-center text-center">
                    <div className="max-w-6xl">
                        <motion.h1
                            className="text-4xl lg:text-6xl font-bold mb-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <TypeAnimation
                                sequence={[
                                    'Smart Title Verification System',
                                    1000,
                                    'Intelligent Title Analysis',
                                    1000,
                                    'Advanced Trademark Validation',
                                    1000,
                                ]}
                                wrapper="span"
                                speed={50}
                                repeat={Infinity}
                            />
                        </motion.h1>
                        <motion.p
                            className="text-lg mb-8 text-gray-200 w-[70%] mx-auto"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                        >
                            Ensure unique and compliant titles with our advanced AI-powered verification system.
                            Leveraging multiple algorithms for accurate similarity detection.
                        </motion.p>
                        <motion.div
                            className="flex gap-4 justify-center"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8, duration: 0.8 }}
                        >
                            <Link
                                href="/title-verify"
                                className="bg-accent-500 hover:bg-accent-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                            >
                                Try Verification
                            </Link>
                            <Link
                                href="/title-registration"
                                className="border border-white hover:bg-white hover:text-primary-700 px-8 py-3 rounded-lg font-semibold transition-colors"
                            >
                                Registration
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}

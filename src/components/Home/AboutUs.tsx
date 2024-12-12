"use client"
import Image from 'next/image'
import React from 'react'
import { motion } from 'framer-motion'

export default function AboutUs() {
    return (
        <div className='w-full flex justify-between items-center p-12 bg-white'>
            <motion.div 
                className='lg:w-1/2 mb-10 lg:mb-0 lg:pr-10'
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                    Advanced Title Verification
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                    Our system combines cutting-edge algorithms with efficient caching to provide
                    fast and accurate title verification. Using techniques like Metaphone, NYSIIS,
                    and vector similarity, we ensure comprehensive validation of your titles.
                </p>
                <p className="text-lg text-gray-600">
                    With Redis caching and intelligent probability scoring, you get instant
                    results while maintaining high accuracy in detecting similar or duplicate titles.
                </p>
            </motion.div>
            <motion.div 
                className='lg:w-1/2'
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <Image
                    src="/Home/AboutUs.png"
                    alt="Title Verification System"
                    width={500}
                    height={500}
                    className="rounded-lg shadow-lg w-full"
                />
            </motion.div>
        </div>
    )
}

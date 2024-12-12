"use client"
import React from 'react';
import { FaCheckCircle, FaDatabase, FaBolt, FaChartLine } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

export default function FeaturesSection() {
  const features = [
    {
      icon: <FaCheckCircle className="w-8 h-8" />,
      title: "Multi-Algorithm Verification",
      description: "Combines Metaphone, NYSIIS, and advanced similarity checks for comprehensive title validation."
    },
    {
      icon: <FaBolt className="w-8 h-8" />,
      title: "Redis Caching",
      description: "Lightning-fast responses with intelligent caching of recent verification results."
    },
    {
      icon: <FaDatabase className="w-8 h-8" />,
      title: "Vector Database",
      description: "Efficient storage and retrieval of existing titles for quick similarity comparisons."
    },
    {
      icon: <FaChartLine className="w-8 h-8" />,
      title: "Probability Scoring",
      description: "Advanced scoring system to determine the likelihood of title acceptance or rejection."
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
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
            Advanced Verification Features
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive title verification powered by multiple algorithms and intelligent caching
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <AnimatePresence>
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="text-accent-500 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

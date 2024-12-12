"use client"
import AboutUs from '@/components/Home/AboutUs'
import FAQ from '@/components/Home/FAQ'
import FeaturesSection from '@/components/Home/FeaturesSection'
import Footer from '@/components/Home/Footer'
import HeroSection from '@/components/Home/HeroSection'
import { motion } from 'framer-motion'
import React from 'react'

export default function HomePage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <HeroSection />
      <AboutUs />
      <FeaturesSection />
      <FAQ />
      <Footer />
    </motion.div>
  )
}

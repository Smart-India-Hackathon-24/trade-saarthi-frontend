import AboutUs from '@/components/Home/AboutUs'
import FAQ from '@/components/Home/FAQ'
import FeaturesSection from '@/components/Home/FeaturesSection'
import Footer from '@/components/Home/Footer'
import HeroSection from '@/components/Home/HeroSection'
import React from 'react'

export default function page() {
  return (
    <div>
      <HeroSection />
      <AboutUs />
      <FeaturesSection />
      <FAQ />
      <Footer />
    </div>
  )
}

import React from 'react'
import { BackgroundLinesDemo } from '../components/BackgroundLinesDemo'
import { MacbookScrollDemo } from '../components/MacbookScrollDemo'
import { CodeBlockDemo } from '../components/CodeBlockDemo'
import { BackgroundGradientAnimationDemo } from '../components/BackgroundGradientAnimationDemo'
import { StickyScrollRevealDemo } from '../components/StickyScrollRevealDemo'
import { FeaturesSectionDemo } from '../components/FeaturesSectionDemo'
import { HeroHighlightDemo } from '../components/HeroHighlightDemo'
import { HoverBorderGradient } from '../components/ui/hover-border-gradient'
import { Footer } from '../components/Footer'
import { Navbar } from '../components/NavbarDemo'

export default function Home() {


  document.title = "EditFlow | Enhance Your Coding Experience";

  return (
    <div className='bg-black'>

      <Navbar className="text-white" />
      <BackgroundLinesDemo />
      <MacbookScrollDemo />
      {/* <BackgroundGradientAnimationDemo/> */}
      {/* <StickyScrollRevealDemo /> */}
      <FeaturesSectionDemo />
      <HeroHighlightDemo />
      <Footer />

    </div>
  )
}

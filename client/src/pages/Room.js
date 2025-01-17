import React from 'react'
import { AnimatedPinDemo } from '../components/AnimatedPinDemo.js'
import Navbar from '../components/NavbarDemo.js'
import Footer from '../components/Footer.js'
import { GlobeDemo } from '../components/GitGlobe.js'

export default function Room() {

  document.title = "Create or Join Rooms | Collaborate with Teammates and Enhance Coding Experience";

  return (
    <div className='bg-black'>

      <Navbar />

      <div className='bg-black mx-auto flex items-center justify-center -h-screen flex-col md:flex-row max-w-4xl'>
        <GlobeDemo />
      </div>

      <div className='bg-black mx-auto flex items-center justify-center min-h-screen flex-col md:flex-row max-w-4xl'>
        <AnimatedPinDemo
          href="/room/create"
          title="Create a Room"
          name="Create a Room"
          description="Create an epic room to code and conquer challenges with your teammates!"
        />
        <AnimatedPinDemo
          href="/room/join"
          title="Join a Room"
          name="Join a Room"
          description="Join an exciting room to collaborate and code with your teammates!"
        />
      </div>

      <Footer />

    </div>
  )
}

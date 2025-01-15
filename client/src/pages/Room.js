import React from 'react'
import { AnimatedPinDemo } from '../components/AnimatedPinDemo.js'
import Navbar from '../components/NavbarDemo.js'
import Footer from '../components/Footer.js'
import { GlobeDemo } from '../components/GitGlobe.js'

export default function Room() {
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
          description="Create a room to host a movie night with your friends!"


        />
        <AnimatedPinDemo

          href="/room/join"
          title="Join a Room"
          name="Join a Room"
          description="Join a room to watch movies with your friends"
        />
      </div>

      <Footer />

    </div>
  )
}

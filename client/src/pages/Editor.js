import React from 'react'
import EditorNav from '../components/EditorNav'
import EditorSidebar from '../components/EditorSideBar.js'


export default function Editor() {
  return (
    <div className='bg-pink-400 min-h-screen text-white'>
      <EditorNav />
      <EditorSidebar />
    </div>
  )
}

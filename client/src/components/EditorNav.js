import React, { useState } from "react"
import themeNames from "../Constants/themeNames.js"
import languages from "../Constants/languages.js"
import availableFontSize from "../Constants/availableFontSize.js"
import { Play, FileCode, BrainCircuit, AlignJustify, ChevronDown, Home } from "lucide-react"

export default function EditorNav() {
  const [theme, setTheme] = useState(themeNames[0])
  const [language, setLanguage] = useState(languages[0].roomLanguage)
  const [fontSize, setFontSize] = useState(availableFontSize[0])

  return (
    <nav className="bg-neutral-900 text-gray-100 px-4 py-2 border-b border-neutral-700">
      <div className="flex justify-between items-center">
        {/* Theme select menu */}
        <div className="relative">
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="appearance-none bg-neutral-800 border border-neutral-700 text-gray-200 rounded px-2 py-1 pr-6 text-sm focus:outline-none "
          >
            {themeNames.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-1 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>

        {/* Language and font size selection */}
        <div className="flex space-x-2">
          <div className="relative">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="appearance-none bg-neutral-800 border border-neutral-700 text-gray-200 rounded px-2 py-1 pr-6 text-sm focus:outline-none "

            >
              {languages.map((lang) => (
                <option key={lang.roomLanguage} value={lang.roomLanguage}>
                  {lang.roomLanguage}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-1 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
          <div className="relative">
            <select
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              className="appearance-none bg-neutral-800 border border-neutral-700 text-gray-200 rounded px-2 py-1 pr-6 text-sm focus:outline-none "

            >
              {availableFontSize.map((size) => (
                <option key={size} value={size}>
                  {size}px
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-1 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex space-x-2">
          {/* <button className="bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-gray-100 px-2 py-1 rounded text-sm flex items-center text-center justify-center">
            <Home className="w-4 h-4 mr-1" />
          </button> */}
          <button className="bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-gray-100 px-2 py-1 rounded text-sm flex items-center">
            <Play className="w-4 h-4 mr-1" /> Run
          </button>
          <button className="bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-gray-100 px-2 py-1 rounded text-sm flex items-center">
            <FileCode className="w-4 h-4 mr-1" /> Format
          </button>
          <button className="bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-gray-100 px-2 py-1 rounded text-sm flex items-center">
            <BrainCircuit className="w-4 h-4 mr-1" /> AI
          </button>
          <button className="bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-gray-100 px-2 py-1 rounded text-sm flex items-center">
            <AlignJustify className="w-4 h-4 mr-1" /> Wrap
          </button>
        </div>
      </div>
    </nav>
  )
}
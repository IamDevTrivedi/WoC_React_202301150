import React from 'react';
import EditorNav from '../components/EditorNav';
import EditorSidebar from '../components/EditorSideBar.js';
import Split from "react-split";
import Editor from "@monaco-editor/react";

export default function MainEditor() {
  return (
    <div className="h-screen w-screen flex flex-col bg-neutral-950 overflow-hidden">
      {/* Top Navigation */}
      <div className="flex-none">
        <EditorNav />
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="flex-none">
          <EditorSidebar />
        </div>

        {/* Editor Area */}
        <div className="flex-1 overflow-hidden">
          <Split
            direction="vertical"
            sizes={[60, 40]}
            minSize={60}
            maxSize={800}
            gutterSize={4}
            className="h-full split-wrapper"
          >
            {/* Code Editor Section */}
            <div className="overflow-hidden rounded-none border-x border-b border-[#404040]">
              <div className="h-9 bg-[#2D2D2D] flex items-center px-4 border-b border-[#404040]">
                <span className="text-gray-300 text-sm font-medium">Code Editor</span>
              </div>
              <Editor
                height="calc(100% - 36px)"
                defaultLanguage="javascript"
                defaultValue="// Write your code here"
                options={{
                  fontSize: 14,
                  wordWrap: "on",
                  minimap: { enabled: true },
                  scrollbar: {
                    vertical: "visible",
                    horizontal: "visible",
                    useShadows: false,
                  },
                  overviewRulerBorder: false,
                  padding: { top: 8 },
                }}
                theme="vs-dark"
              />
            </div>

            
            <div className="overflow-hidden">
              <Split sizes={[50, 50]} minSize={100} gutterSize={8} className="flex h-full" style={{ height: "100%" }}>
                <div className="overflow-hidden flex flex-col rounded-md border border-[#404040]">
                  <div className="h-8 bg-[#2D2D2D] flex items-center justify-between px-4 border-b border-[#404040]">
                    <span className="text-gray-300 text-sm font-medium">Input</span>
                    <button
                      className="text-gray-400 hover:text-gray-200 text-sm px-2 py-1 rounded hover:bg-[#404040] transition-colors"
                    >
                      Clear
                    </button>
                  </div>
                  <Editor
                    height="calc(100% - 32px)"
                    defaultLanguage="plaintext"
                    options={{
                      fontSize: 16,
                      wordWrap: "on",
                      minimap: { enabled: false },
                      lineNumbers: "off",
                      roundedSelection: false,
                      scrollBeyondLastLine: false,
                      padding: { top: 8 },
                    }}
                    theme="vs-dark"
                  />
                </div>

                <div className="overflow-hidden flex flex-col rounded-md border border-[#404040]">
                  <div className="h-8 bg-[#2D2D2D] flex items-center justify-between px-4 border-b border-[#404040]">
                    <span className="text-gray-300 text-sm font-medium">Output</span>
                    <div>
                      <button
                        className="text-gray-400 hover:text-gray-200 text-sm px-2 py-1 rounded hover:bg-[#404040] transition-colors"
                      >
                        Copy
                      </button>
                      <button
                        className="text-gray-400 hover:text-gray-200 text-sm px-2 py-1 rounded hover:bg-[#404040] transition-colors"
                      >
                        Clear
                      </button>
                    </div>
                  </div>
                  <Editor
                    height="calc(100% - 32px)"
                    defaultLanguage="plaintext"
                    options={{
                      fontSize: 16,
                      wordWrap: "on",
                      readOnly: true,
                      minimap: { enabled: false },
                      lineNumbers: "on",
                      roundedSelection: false,
                      scrollBeyondLastLine: false,
                      padding: { top: 8 },
                    }}
                    theme="vs-dark"
                  />
                </div>
              </Split>
            </div>
            

          </Split>
        </div>
      </div>
    </div>
  );
}
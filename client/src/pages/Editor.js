import React from 'react';
import EditorNav from '../components/EditorNav';
import EditorSidebar from '../components/EditorSideBar.js';
import CodeEditorForMain from '../components/CodeEditorForMain';

export default function MainEditor() {
  return (
    <div className="h-screen w-screen flex flex-col bg-neutral-950 overflow-hidden">
      <div className="flex-none">
        <EditorNav />
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className="flex-none">
          <EditorSidebar />
        </div>

        <div className="flex-1 overflow-hidden">
          < CodeEditorForMain />
        </div>
      </div>
    </div>
  );
}
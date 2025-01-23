import EditorSidebarForDemo from '../components/EditorSidebarForDemo.js';
import CodeEditorForDemo from '../components/CodeEditorForDemo.js';


const EditorTry = () => {
    return (
        <div className="flex overflow-hidden">
            <EditorSidebarForDemo />
            <div className='flex-1 text-white bg-black'>
                < CodeEditorForDemo />
            </div>
        </div>
    );
};


export default EditorTry;
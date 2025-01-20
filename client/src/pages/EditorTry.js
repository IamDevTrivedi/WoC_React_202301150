import EditorSidebar from '../components/EditorSidebar';
import CodeEditorDemo from '../components/CodeEditorDemo.js';


const EditorTry = () => {
    return (
        <div className="flex overflow-hidden">
            <EditorSidebar />
            <div className='flex-1 text-white bg-black'>
                < CodeEditorDemo />
            </div>
        </div>
    );
};


export default EditorTry;
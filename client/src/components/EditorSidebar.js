import { useState } from 'react';
import { Sidebar, Menu } from 'react-pro-sidebar';
import { ChevronLeft, ChevronRight, File, FilePlus, FolderPen, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const EditorSidebar = () => {
  const [files] = useState([
    "file1",
    "file2",
    "file3",
    "file4",
    "file5",
    "file6",
    "file7",
    "file8",
    "file9"
  ]);

  // State to control sidebar collapse
  const [collapsed, setCollapsed] = useState(false);

  // Toggle collapse state
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Sidebar
      collapsed={collapsed}
      backgroundColor="rgb(0, 0, 0)"
      className="h-[calc(100vh-47px)] bg-neutral-800 text-gray-50 overflow-y-hidden"
    >
      {/* Header */}
      <div className="p-4 flex items-center justify-between border-b border-neutral-800">
        <Link to="/" className={`text-white text-2xl font-semibold ${collapsed ? 'hidden' : 'block'}`}>
          EditFlow
        </Link>
        <button
          onClick={toggleSidebar}
          className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-900 transition-colors"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      <div className='px-1 border border-neutral-800'></div>

      <div className={`${collapsed ? 'hidden' : 'block'}`}>

        <button
          className="px-4 py-1 w-full text-left hover:bg-neutral-900 flex items-center text-gray-100"
        >
          <FilePlus size={20} className="mr-2" />
          New File
        </button>

      </div>
      <div className='px-1 border border-neutral-800'></div>

      <Menu
        className={`pt-4 ${collapsed ? 'hidden' : 'block'}`}
        menuItemStyles={{
          button: {
            color: '#f9fafb',
            backgroundColor: '#171717',
            '&:hover': {
              backgroundColor: '#171717'
            }
          }
        }}
      >
        <ul>
          {files.map((fileName, index) => (
            <li
              key={index}
              className="flex items-center justify-between text-gray-300 px-4 py-1"
            >
              <span className="flex items-center">
                <File size={15} className="mr-2" />
                {fileName}
              </span>
              <span className="flex items-center space-x-2">
                <Trash2
                  size={20}
                  className="cursor-pointer hover:bg-neutral-700 p-1 hover:text-white text-gray-400 rounded-lg"
                  aria-label="Delete file"
                />
                <FolderPen
                  size={20}
                  className="cursor-pointer hover:bg-neutral-700 p-1 hover:text-white text-gray-400 rounded-lg"
                  aria-label="Edit folder"
                />
              </span>
            </li>
          ))}
        </ul>

        {
          files.length === 0 && (
            <ul>
              <li className="text-center text-gray-300 py-4">No files found</li>
            </ul>
          )
        }

      </Menu>
    </Sidebar>
  );
};

export default EditorSidebar;
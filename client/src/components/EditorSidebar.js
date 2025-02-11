import { useState, useContext, useEffect } from 'react';
import { Sidebar, Menu } from 'react-pro-sidebar';
import { ChevronLeft, ChevronRight, Download, File, FilePlus, FolderPen, Trash2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { EditorContext } from '../Context/EditorContext';
import Loading from './Loading';


const EditorSidebar = () => {

  const { isSideBarOpen, setIsSideBarOpen, openFile, handleFileOnClick, files, handleUploadFile, handleAddNewFile, handleGetAllFiles, handleDownloadFile, handleDeleteFile, handleRenameFile } = useContext(EditorContext);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const init = async () => {
      try {
        setLoading(true);

        if (!await handleGetAllFiles()) {
          navigate('/login');
        }
        else {

        }

      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  const toggleSidebar = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };

  if (loading) {
    return <Loading />;
  }

  return (

    <Sidebar
      collapsed={isSideBarOpen}
      backgroundColor="#1f1e1e"
      className="h-[calc(100vh-47px)] bg-neutral-800 text-gray-50 overflow-y-hidden"
    >
      {/* Header */}
      <div className="p-4 flex items-center justify-between border-b border-neutral-800">
        <Link to="/" className={`text-white text-2xl font-semibold ${isSideBarOpen ? 'hidden' : 'block'}`}>
          EditFlow
        </Link>
        <button
          onClick={toggleSidebar}
          className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-900 transition-colors"
        >
          {isSideBarOpen ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      <div className='px-1 border border-neutral-800'></div>

      <div className={`${isSideBarOpen ? 'hidden' : 'block'}`}>

        <button
          className="px-4 py-1 w-full text-left hover:bg-neutral-900 flex items-center text-gray-100"
          onClick={handleAddNewFile}
        >
          <FilePlus size={20} className="mr-2" />
          New File
        </button>
        <button
          className="px-4 py-1 w-full text-left hover:bg-neutral-900 flex items-center text-gray-100"
          onClick={async () => {
            await handleUploadFile();
          }}
        >

          <FilePlus size={20} className="mr-2" />
          Upload File
        </button>

        <input
          type='file'
          className='hidden'
          id='upload-file-input'
        ></input>

      </div>
      <div className='px-1 border border-neutral-800'></div>

      <Menu
        className={`pt-4 ${isSideBarOpen ? 'hidden' : 'block'}`}
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
          {files.map((file, index) => (
            <li
              key={index}
              className="flex items-center justify-between text-gray-300 px-4 py-1"
            >
              <span className="flex items-center cursor-pointer" onClick={() => handleFileOnClick(file.fileId)}>
                <File size={15} className="mr-2" />
                {
                  openFile === file.fileId ? (
                    <span className="text-white">{file.fileFullName}</span>
                  ) : (
                    <span className='text-gray-400'>{file.fileFullName}</span>
                  )
                }
              </span>
              <span className="flex items-center space-x-2">
                <span>
                  <Download
                    onClick={() => {
                      console.log('Download file:', file);
                      handleDownloadFile(file.fileId);
                    }}
                    size={20}
                    className="cursor-pointer hover:bg-neutral-700 p-1 hover:text-white text-gray-400 rounded-lg"
                    aria-label="Edit folder"
                  />
                </span>
                <span>
                  <FolderPen
                    onClick={() => handleRenameFile(file.fileId)}
                    size={20}
                    className="cursor-pointer hover:bg-neutral-700 p-1 hover:text-white text-gray-400 rounded-lg"
                    aria-label="Edit folder"
                  />
                </span>
                <span>
                  <Trash2
                    onClick={() => handleDeleteFile(file.fileId)}
                    size={20}
                    className="cursor-pointer hover:bg-neutral-700 p-1 hover:text-white text-gray-400 rounded-lg"
                    aria-label="Delete file"
                  />
                </span>
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
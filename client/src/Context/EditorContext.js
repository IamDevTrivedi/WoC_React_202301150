import React, { createContext, useRef, useState } from 'react';
import languages from '../Constants/languages';
import axios from 'axios';
import { message } from 'antd';

const EditorContext = createContext();

const EditorProvider = ({ children }) => {

    const BACKEND_URL = process.env.REACT_APP_NODE_ENV === 'development'
        ? process.env.REACT_APP_BACKEND_URL
        : process.env.REACT_APP_BACKEND_URL_PROD;

    const FRONTEND_URL = process.env.REACT_APP_NODE_ENV === 'development'
        ? process.env.REACT_APP_FRONTEND_URL
        : process.env.REACT_APP_FRONTEND_URL_PROD;

    const axiosInstance = axios.create({
        baseURL: BACKEND_URL,
        withCredentials: true
    });

    const [isSideBarOpen, setIsSideBarOpen] = useState(false);

    const [editorState, setEditorState] = useState({
        editorLanguage: "javascript",
        editorTheme: "vs-dark",
        editorFontSize: 16,
        editorCodeContent: "// Write your code here",
        isWordWrap: false,
        editorFileExtension: ".js",
        editorInput: "",
    });

    const [files, setFiles] = useState([

    ]);


    const [complierState, setComplierState] = useState({
        complierLanguage: "javascript",
        complierOutput: "",
        complierError: "",
        isComplierRunning: false,
    });

    const handleLanguageChange = (e) => {
        const selectedRoomLanguage = e.target.value;
        const selectedLanguage = languages.find(lang => lang.roomLanguage === selectedRoomLanguage);

        if (!selectedLanguage) {
            console.error(`Language not found: ${selectedRoomLanguage}`);
            return;
        }

        setEditorState(prev => ({
            ...prev,
            editorLanguage: selectedLanguage.editorLanguage,
            editorFileExtension: selectedLanguage.extension,
            editorCodeContent: selectedLanguage.helloWorld || "// Write your code here",
        }));


        setComplierState(prev => ({
            ...prev,
            complierLanguage: selectedLanguage.editorLanguage
        }));

        console.log('Selected Language:', selectedLanguage);
        console.log('Editor State:', editorState);
        console.log('Complier State:', complierState);
    };


    const handleRunCode = async () => {

        console.log('EditorState:', editorState);
        console.log('ComplierState:', complierState);

        try {

            setComplierState(prev => ({
                ...prev,
                isComplierRunning: true
            }));

            const compilerOptions = {

                method: 'POST',
                url: 'https://onecompiler-apis.p.rapidapi.com/api/v1/run',
                headers: {
                    'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_KEY,
                    'x-rapidapi-host': 'onecompiler-apis.p.rapidapi.com',
                    'Content-Type': 'application/json'
                },

                body: {
                    language: complierState.complierLanguage,
                    stdin: editorState.editorInput,
                    files: [{
                        name: `main${editorState.editorFileExtension}`,
                        content: editorState.editorCodeContent
                    }]
                }
            }

            const response = await fetch(compilerOptions.url, {
                method: compilerOptions.method,
                headers: compilerOptions.headers,
                body: JSON.stringify(compilerOptions.body)
            });

            const result = await response.json();

            setComplierState(prev => ({
                ...prev,
                complierOutput: result.stderr || result.stdout || 'No output generated'
            }));

        } catch (error) {
            setComplierState(prev => ({
                ...prev,
                error: 'Failed to execute code'
            }));
        }
        finally {
            setComplierState(prev => ({
                ...prev,
                isComplierRunning: false
            }));
        }
    }


    const handleFormatCode = () => {

        const unformattedCode = editorState.editorCodeContent;
        const formattedCode = window.prettier.format(unformattedCode, {
            parser: "babel",
            plugins: window.prettierPlugins
        });

        setEditorState((prev) => ({
            ...prev,
            editorCodeContent: formattedCode
        }));
    }


    const handleWordWrap = () => {
        setEditorState((prev) => ({
            ...prev,
            isWordWrap: !prev.isWordWrap
        }));
    }

    const monacoRef = useRef(null);
    const monacoInstanceRef = useRef(null);

    const handleChangeTheme = (themeName) => {

        console.log('Theme Name:', themeName);

        fetch(`/Constants/${themeName}.json`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Failed to fetch theme: ${themeName}`);
                }
                return response.json();
            })
            .then((themeData) => {
                if (monacoInstanceRef.current) {
                    monacoInstanceRef.current?.editor.defineTheme(themeName, themeData);
                    monacoInstanceRef.current?.editor.setTheme(themeName);
                } else {
                    console.error("Monaco instance is not available");
                }
            })
            .catch((error) => {
                console.error("Error changing theme: ", error);
            });


        setEditorState(prev => ({
            ...prev,
            editorTheme: themeName
        }));
    };



    /******************************************************************************/

    const handleAddNewFile = async () => {
        // Ask user for file name
        const addedFileName = prompt('Enter file name');

        if (!addedFileName) {
            return false;
        }

        // Check if file already exists
        if (files.find((file) => file.fileName === addedFileName)) {
            alert('File already exists');
            return false;
        }

        // Split file name and extension
        const [fileName, fileExtension] = addedFileName.split('.');

        // Find the selected language based on file extension
        const selectedLanguage = languages.find((lang) => lang.extension === "." + fileExtension);

        if (!selectedLanguage) {
            alert("File Extension not allowed");
            return false;
        }

        // Create new file object
        const newFile = {
            fileName: fileName,
            fileLanguage: selectedLanguage.editorLanguage,
            fileContent: `// this File is Created At ${new Date().toLocaleString()}`
        };

        try {
            // Send request to add the file
            const { data } = await axiosInstance.post("/api/user/add-file", newFile);

            if (data.success) {
                setFiles(prev => [...prev, {
                    ...prev,
                    fileFullName: addedFileName,
                    fileContent: data.data.fileContent,
                    fileLanguage: selectedLanguage.editorLanguage,
                    fileExtension: selectedLanguage.extension,
                    fileId: data.data.fileId
                }]);
                return true;
            } else {
                message.error(data.error || 'Failed to create new File');
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || 'An error occurred. Please try again later.';
            message.error(errorMessage);
            return false;
        }
    };


    const handleGetAllFiles = async () => {

        try {

            const { data } = await axiosInstance.post("/api/user/get-files");

            if (data.success) {

                const array = data.data.map((file) => ({
                    fileFullName: file.fileName,
                    fileContent: file.fileContent,
                    fileLanguage: file.fileLanguage,
                    fileExtension: "." + file.fileName.split('.').pop(),
                    fileId: file.fileId
                }));

                setFiles(array);

                return true;
            } else {
                message.error(data.error || 'Failed to fetch Files');
                return false;
            }


        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || 'An error occurred. Please try again later.';
            message.error(errorMessage);
            return false;
        }

    };


    const value = {
        isSideBarOpen,
        setIsSideBarOpen,

        editorState,
        setEditorState,

        files,
        setFiles,

        complierState,
        setComplierState,

        monacoRef,
        monacoInstanceRef,

        handleRunCode,
        handleFormatCode,
        handleWordWrap,
        handleLanguageChange,
        handleChangeTheme,

        handleAddNewFile,
        handleGetAllFiles
    };

    return (
        <EditorContext.Provider value={value}>
            {children}
        </EditorContext.Provider>
    );
};


export { EditorContext, EditorProvider };
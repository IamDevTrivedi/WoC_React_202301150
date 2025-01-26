import { editor } from 'monaco-editor';
import React, { createContext, useState } from 'react';
import languages from '../Constants/languages';

const EditorContext = createContext();

const EditorProvider = ({ children }) => {


    const [isSideBarOpen, setIsSideBarOpen] = useState(false); // done

    const [editorState, setEditorState] = useState({
        editorLanguage: "javascript",
        editorTheme: "vs-dark",
        editorFontSize: 14,
        editorCodeContent: "// Write your code here",
        isWordWrap: false,
        editorFileExtension: ".js",
        editorInput: "",
    });


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


    const value = {
        isSideBarOpen,
        setIsSideBarOpen,

        editorState,
        setEditorState,

        complierState,
        setComplierState,

        handleRunCode,
        handleFormatCode,
        handleWordWrap,
        handleLanguageChange,
    };
    return (
        <EditorContext.Provider value={value}>
            {children}
        </EditorContext.Provider>
    );
};


export { EditorContext, EditorProvider };
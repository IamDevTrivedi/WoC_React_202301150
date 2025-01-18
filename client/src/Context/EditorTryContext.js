import React, { createContext, useRef, useState } from 'react';
import languages from '../Constants/languages';


const EditorContext = createContext();

const EditorTryProvider = ({ children }) => {

    const [editorState, setEditorState] = useState({
        theme: 'Active4D',
        language: 'javascript',
        codeContent: 'console.log("Hello World")',
        input: '',
        fontSize: 20,
        isWordWrap: false,
        fileExtension: '.js'
    });


    const [complierState, setComplierState] = useState({
        language: 'javascript',
        output: '',
        error: ''
    });


    const [isSideBarOpen, setIsSideBarOpen] = useState(true);

    const monacoRef = useRef(null);

    const handleFontSizeChange = (size) => {
        setEditorState((prev) => ({
            ...prev,
            fontSize: size
        }));
    }

    const handleLanguageChange = (lang) => {
        const selectedLanguage = languages.find((language) => language.editorLanguage === lang);

        console.log('selectedLanguage:', selectedLanguage);

        setEditorState((prev) => ({
            ...prev,
            language: selectedLanguage.editorLanguage,
            fileExtension: selectedLanguage.extension,
            codeContent: selectedLanguage.helloWorld
        }));

        setComplierState((prev) => ({
            ...prev,
            language: selectedLanguage.codeLanguage
        }))

    }

    const handleThemeChange = (theme) => {
        setEditorState((prev) => ({
            ...prev,
            theme: theme
        }));

        fetch(`../Constants/monaco-themes-master/${theme}.json`)
            .then(data => data.json())
            .then(data => {
                monacoRef?.current.editor.defineTheme(theme, data);
                monacoRef?.current.editor.setTheme(theme);
            })
    }


    const handleWordWrapChange = (isWordWrap) => {
        setEditorState((prev) => ({
            ...prev,
            isWordWrap: isWordWrap
        }));
    }



    const handleFormatCode = () => {

        const unformattedCode = editorState.codeContent;
        const formattedCode = window.prettier.format(unformattedCode, {
            parser: "babel",
            plugins: window.prettierPlugins
        });

        setEditorState((prev) => ({
            ...prev,
            codeContent: formattedCode
        }));
    }


    const handleRunCode = async () => {


        try {
            setComplierState(prev => ({ ...prev, error: null }));

            const compilerOptions = {

                method: 'POST',
                url: 'https://onecompiler-apis.p.rapidapi.com/api/v1/run',
                headers: {
                    'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_KEY,
                    'x-rapidapi-host': 'onecompiler-apis.p.rapidapi.com',
                    'Content-Type': 'application/json'
                },

                body: {
                    language: complierState.language,
                    stdin: editorState.input,
                    files: [{
                        name: `main${editorState.fileExtension}`,
                        content: editorState.codeContent
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
                output: result.stderr || result.stdout || 'No output generated'
            }));

            console.log('Output:', result.stderr || result.stdout || 'No output generated');
        }
        catch {
            setComplierState(prev => ({
                ...prev,
                error: 'Failed to execute code'
            }));
        }
        finally {
            setComplierState(prev => ({ ...prev, isCompiling: false }));
        }
    }



    const handleDownloadCode = () => {
        const element = document.createElement('a');
        const file = new Blob([editorState.codeContent], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = `main-${Date.now().toString()}${editorState.fileExtension}`;
        document.body.appendChild(element);
        element.click();
    }

    const value = {
        editorState,
        setEditorState,

        complierState,
        setComplierState,

        isSideBarOpen,
        setIsSideBarOpen,

        monacoRef,

        handleFontSizeChange,
        handleLanguageChange,
        handleThemeChange,
        handleWordWrapChange,
        handleFormatCode,
        handleRunCode,
        handleDownloadCode
    };

    return (
        <EditorContext.Provider value={value}>
            {children}
        </EditorContext.Provider>
    );
};


export { EditorContext, EditorTryProvider };
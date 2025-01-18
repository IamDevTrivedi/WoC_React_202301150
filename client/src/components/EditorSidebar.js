import React, { useState, useRef } from 'react';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import {
    Code2,
    Palette,
    Languages,
    FileUp,
    FileDown,
    Play,
    AlignCenter,
    WrapText,
    Bot,
    ChevronLeft,
    ChevronRight,
    Type,
    FileInput
} from 'lucide-react';
import { Link } from 'react-router-dom';

const EditorSidebar = () => {

    const availableFontSize = [8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32];
    const [collapsed, setCollapsed] = useState(false);
    const [fontSize, setFontSize] = useState(14);
    const uploadCodeRef = useRef(null);
    const uploadInputRef = useRef(null);

    const handleFileUpload = (type, event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const content = e.target.result;
            // Handle the file content based on type
            console.log(`${type} content:`, content);
            // You can add your file handling logic here
        };
        reader.readAsText(file);
    };

    const handleDownloadCode = () => {
        // Add your code download logic here
        const content = "Your code content here";
        const blob = new Blob([content], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'code.txt';
        a.click();
        window.URL.revokeObjectURL(url);
    };

    return (
        <div className="min-h-screen bg-black text-gray-50">
            <Sidebar
                collapsed={collapsed}
                backgroundColor="rgb(0, 0, 0)"
                className="h-full border-r border-neutral-900"
            >
                {/* Header */}
                <div className="p-4 flex items-center justify-between border-b border-neutral-900">
                    <Link to="/" className={`text-white text-2xl font-semibold ${collapsed ? 'hidden' : 'block'}`}>
                        EditFlow
                    </Link>
                    <button
                        onClick={() => setCollapsed(!collapsed)}
                        className="p-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-950 transition-colors"
                    >
                        {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                    </button>
                </div>

                <Menu
                    className="pt-4"
                    menuItemStyles={{
                        button: {
                            color: '#f9fafb',
                            backgroundColor: 'transparent',
                            '&:hover': {
                                backgroundColor: '#171717'
                            }
                        }
                    }}
                >
                    {/* Primary Actions */}
                    <MenuItem
                        icon={<Play size={20} />}
                        className="text-blue-700 hover:text-blue-800"
                    >
                        Run Code
                    </MenuItem>
                    <MenuItem icon={<AlignCenter size={20} />}>
                        Format Code
                    </MenuItem>
                    <MenuItem icon={<WrapText size={20} />}>
                        Word Wrap
                    </MenuItem>
                    <MenuItem icon={<Bot size={20} />}>
                        Ask AI
                    </MenuItem>

                    <div className="border-t border-neutral-900 my-4"></div>

                    {/* File Operations */}
                    <MenuItem
                        icon={<FileUp size={20} />}
                        onClick={() => uploadCodeRef.current?.click()}
                    >
                        Upload Code
                        <input
                            ref={uploadCodeRef}
                            type="file"
                            accept=".txt,.js,.py,.java,.cpp"
                            className="hidden"
                            onChange={(e) => handleFileUpload('code', e)}
                        />
                    </MenuItem>
                    <MenuItem
                        icon={<FileDown size={20} />}
                        onClick={handleDownloadCode}
                    >
                        Download Code
                    </MenuItem>
                    <MenuItem
                        icon={<FileInput size={20} />}
                        onClick={() => uploadInputRef.current?.click()}
                    >
                        Upload Input
                        <input
                            ref={uploadInputRef}
                            type="file"
                            accept=".txt"
                            className="hidden"
                            onChange={(e) => handleFileUpload('input', e)}
                        />
                    </MenuItem>

                    <div className="border-t border-neutral-900 my-4"></div>

                    {/* Settings */}
                    <SubMenu
                        label="Theme"
                        icon={<Palette size={20} />}
                    >
                        <MenuItem className="bg-black hover:bg-neutral-900">Light</MenuItem>
                        <MenuItem className="bg-black hover:bg-neutral-900">Dark</MenuItem>
                        <MenuItem className="bg-black hover:bg-neutral-900">System</MenuItem>
                    </SubMenu>

                    <SubMenu
                        label="Language"
                        icon={<Languages size={20} />}
                    >
                        <MenuItem className="bg-black hover:bg-neutral-900">JavaScript</MenuItem>
                        <MenuItem className="bg-black hover:bg-neutral-900">Python</MenuItem>
                        <MenuItem className="bg-black hover:bg-neutral-900">Java</MenuItem>
                        <MenuItem className="bg-black hover:bg-neutral-900">C++</MenuItem>
                    </SubMenu>

                    <SubMenu
                        label="Font Size"
                        icon={<Type size={20} />}
                    >
                        {availableFontSize.map((size) => (
                            <MenuItem
                                key={size}
                                className="bg-black hover:bg-neutral-900"
                                onClick={() => setFontSize(size)}
                            >
                                {size}
                            </MenuItem>
                        ))}
                    </SubMenu>
                </Menu>
            </Sidebar>
        </div>
    );
};

export default EditorSidebar;
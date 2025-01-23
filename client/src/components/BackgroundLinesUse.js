import React from "react";
import { BackgroundLines } from "./ui/background-lines";

export function BackgroundLinesUse() {
    return (
        <BackgroundLines className="min-h-screen flex items-center justify-center w-full flex-col px-4">
            <h2
                className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-600 to-white text-6xl md:text-7xl lg:text-7xl font-sans py-4 md:py-10 relative z-20 font-bold tracking-tight">
                EditFlow, <br />
                <span className="text-5xl md:text-4xl lg:text-6xl">Code Smarter. Collaborate Better.</span>
            </h2>
            <p
                className="max-w-xl mx-auto text-base md:text-lg lg:text-xl text-neutral-400 text-center">
                Unlock seamless coding in multiple languages with real-time collaboration.
                Create code rooms, share links with a single click, and code with ease.
            </p>
            <p
                className="max-w-xl mx-auto text-base md:text-lg lg:text-xl text-neutral-400 text-center">
                <i>Designed for developers, by developers.</i>
            </p>
        </BackgroundLines>
    );
}
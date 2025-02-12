import React from "react";
import { Link } from "react-router-dom";

export function Footer() {
    return (
        <footer className="bg-black text-gray-200 py-8">
            <div className="max-w-7xl border-neutral-800 py-3 border-t mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 px-6">
                {/* Branding */}
                <div className="text-center md:text-left">
                    <h1 className="text-white text-lg font-semibold">CodeWhisper</h1>
                    <p className="text-gray-400 text-sm">
                        © {new Date().getFullYear()} CodeWhisper. All rights reserved.
                    </p>
                </div>

                {/* Links */}
                <div className="flex flex-col md:flex-row items-center gap-6 text-sm">
                    <Link
                        to="/about"
                        className="hover:text-gray-50 transition-colors"
                    >
                        About
                    </Link>
                    <Link
                        to="/contact"
                        className="hover:text-gray-50 transition-colors"
                    >
                        Contact
                    </Link>
                    <Link
                        to="/privacy"
                        className="hover:text-gray-50 transition-colors"
                    >
                        Privacy
                    </Link>
                    <Link
                        to="/login"
                        className="hover:text-gray-50 transition-colors"
                    >
                        Login
                    </Link>
                    <Link
                        to="/signup"
                        className="hover:text-gray-50 transition-colors"
                    >
                        Sign Up
                    </Link>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
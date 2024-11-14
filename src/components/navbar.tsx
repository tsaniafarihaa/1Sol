"use client";
import { useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import Link from 'next/link';

export default function Navbar() {
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    return (
        <div className="navbar bg-black opacity-60 fixed top-0 left-0 w-full z-50 py-2">
            {/* Mobile Layout */}
            <div className="navbar-start lg:hidden">
                <div className="dropdown">
                    <button
                        tabIndex={0}
                        role="button"
                        onClick={() => setDropdownOpen(!isDropdownOpen)}
                        className="btn btn-ghost"
                        aria-label="Toggle navigation menu"
                    >
                        <GiHamburgerMenu className="h-6 w-6 text-white" />
                    </button>
                    {isDropdownOpen && (
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-white rounded-box z-10 mt-3 w-52 p-2 shadow"
                            onBlur={() => setDropdownOpen(false)}
                        >
                            <li>
                                <Link href="/" className="text-black hover:text-[#2FA4F9] cursor-pointer">Home</Link>
                            </li>
                            <li>
                                <Link href="/about" className="text-black hover:text-[#2FA4F9] cursor-pointer">About</Link>
                            </li>
                            <li>
                                <Link href="/portfolio" className="text-black hover:text-[#2FA4F9] cursor-pointer">Service</Link>
                            </li>
                            <li>
                                <Link href="/team" className="text-black hover:text-[#2FA4F9] cursor-pointer">Team</Link>
                            </li>
                        </ul>
                    )}
                </div>
            </div>
            
            {/* Mobile Branding */}
            <div className="navbar-end lg:hidden">
                <a className="text-white font-bold text-[19px] mr-6">1Sol</a>
            </div>

            {/* Desktop Layout */}
            <div className="navbar-start hidden lg:flex">
                <a className="text-2xl font-bold text-white">1Sol</a>
            </div>
            <div className="navbar-end hidden lg:flex lg:justify-end lg:pr-10">
                <ul className="menu menu-horizontal space-x-6">
                    <li>
                        <Link href="/" className="text-white font-semibold text-lg hover:text-[#2FA4F9]">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link href="/about" className="text-white font-semibold text-lg hover:text-[#2FA4F9]">
                            About
                        </Link>
                    </li>
                    <li>
                        <Link href="/portfolio" className="text-white font-semibold text-lg hover:text-[#2FA4F9]">
                            Service
                        </Link>
                    </li>
                    <li>
                        <Link href="/team" className="text-white font-semibold text-lg hover:text-[#2FA4F9]">
                            Team
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}

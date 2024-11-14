'use client';

import { useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import Link from 'next/link';
import Image from 'next/image';

const NAV_ITEMS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/portfolio', label: 'Service' },
  { href: '/team', label: 'Team' },
] as const;

const Logo = ({ className = '' }: { className?: string }) => (
  <Link href="/" className={`flex items-center gap-2 ${className}`}>
    <Image
      src="/img/1sol.png"
      alt="1Sol Logo"
      width={170}
      height={80}
      className="w-auto h-8 sm:h-10 lg:h-12"
      priority
    />
    <p className="text-white font-semibold text-sm sm:text-base">ONE SOLUTION</p>
  </Link>
);

const NavLinks = ({ 
  mobile = false, 
  onLinkClick
}: { 
  mobile?: boolean;
  onLinkClick?: () => void;
}) => {
  const baseStyles = mobile
    ? "text-black hover:text-[#2FA4F9] cursor-pointer"
    : "text-white font-semibold text-base sm:text-lg hover:text-[#2FA4F9]";

  return (
    <ul className={mobile ? "menu menu-sm p-2" : "menu menu-horizontal space-x-4 sm:space-x-6"}>
      {NAV_ITEMS.map(({ href, label }) => (
        <li key={href}>
          <Link 
            href={href} 
            className={baseStyles}
            onClick={onLinkClick}
          >
            {label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default function Navbar() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleCloseMenu = () => {
    setDropdownOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50">
      <div className="bg-black/60 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <button
                type="button"
                onClick={() => setDropdownOpen(!isDropdownOpen)}
                className="p-2 text-white hover:text-[#2FA4F9] transition-colors"
                aria-label="Toggle menu"
              >
                <GiHamburgerMenu className="h-6 w-6" />
              </button>
            </div>

            {/* Mobile Logo */}
            <div className="lg:hidden">
              <Logo />
            </div>

            {/* Desktop Layout */}
            <div className="hidden lg:flex lg:items-center lg:w-full">
              <Logo className="mr-8" />
              <div className="flex justify-end flex-1">
                <NavLinks />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isDropdownOpen && (
          <div className="lg:hidden">
            <div className="bg-white rounded-b-lg shadow-lg">
              <NavLinks mobile onLinkClick={handleCloseMenu} />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
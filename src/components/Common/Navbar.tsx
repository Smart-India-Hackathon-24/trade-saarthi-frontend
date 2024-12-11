"use client"
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation';

export default function Navbar() {
    const pathname = usePathname();
    const navLinks = [
        { href: '/home', label: 'Home' },
        { href: '/title-verify', label: 'Title Verify' },
        { href: '/title-registration', label: 'Title Registration' },
        { href: '/title-comparison', label: 'Title Comparison' },
    ];

    return (
        <nav className="bg-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between h-16 items-center">
                    {/* Logo/Brand Name */}
                    <div className="flex-shrink-0">
                        <Link href="/home" className="text-xl font-bold text-primary-500">
                            Trade Mark Saarthi
                        </Link>
                    </div>

                    {/* Navigation Links */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-center space-x-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`px-3 py-2 rounded-md ${
                                        pathname === link.href
                                            ? 'bg-accent-500 text-white'
                                            : 'text-gray-600 hover:text-accent-500 hover:bg-primary-100'
                                    } transition-colors duration-200`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

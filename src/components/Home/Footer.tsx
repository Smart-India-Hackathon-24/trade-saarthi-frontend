import React from 'react';
import Link from 'next/link';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        product: [
            { name: 'Features', href: '/features' },
            { name: 'Documentation', href: '/docs' },
            { name: 'API Reference', href: '/api' },
            { name: 'Pricing', href: '/pricing' },
        ],
        resources: [
            { name: 'Blog', href: '/blog' },
            { name: 'Case Studies', href: '/case-studies' },
            { name: 'Support', href: '/support' },
            { name: 'FAQ', href: '/faq' },
        ],
        company: [
            { name: 'About Us', href: '/about' },
            { name: 'Contact', href: '/contact' },
            { name: 'Privacy Policy', href: '/privacy' },
            { name: 'Terms of Service', href: '/terms' },
        ],
    };

    return (
        <footer className="bg-primary-800 text-white">
            <div className="container mx-auto py-12">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 px-4">
                    {/* Brand Section */}
                    <div className="lg:col-span-2">
                        <Link href="/" className="text-2xl font-bold">
                            Trade Mark Saarthi
                        </Link>
                        <p className="mt-4 text-gray-200 max-w-sm">
                            Advanced title verification system powered by AI and multiple algorithms
                            for accurate trademark validation.
                        </p>
                        {/* Social Links */}
                        <div className="flex space-x-4 mt-6">
                            <a href="#" className="text-gray-200 hover:text-accent-400 transition-colors">
                                <FaGithub size={24} />
                            </a>
                            <a href="#" className="text-gray-200 hover:text-accent-400 transition-colors">
                                <FaLinkedin size={24} />
                            </a>
                            <a href="#" className="text-gray-200 hover:text-accent-400 transition-colors">
                                <FaTwitter size={24} />
                            </a>
                            <a href="mailto:contact@trademarksaarthi.com" className="text-gray-200 hover:text-accent-400 transition-colors">
                                <MdEmail size={24} />
                            </a>
                        </div>
                    </div>

                    {/* Links Sections */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Product</h3>
                        <ul className="space-y-2">
                            {footerLinks.product.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-gray-200 hover:text-accent-400 transition-colors">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">Resources</h3>
                        <ul className="space-y-2">
                            {footerLinks.resources.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-gray-200 hover:text-accent-400 transition-colors">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">Company</h3>
                        <ul className="space-y-2">
                            {footerLinks.company.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-gray-200 hover:text-accent-400 transition-colors">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-primary-700 mt-12 pt-8 px-4">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-gray-200 text-sm">
                            © {currentYear} Trade Mark Saarthi. All rights reserved.
                        </p>
                        <div className="mt-4 md:mt-0">
                            <Link href="/privacy" className="text-gray-200 hover:text-accent-400 text-sm mx-3 transition-colors">
                                Privacy Policy
                            </Link>
                            <Link href="/terms" className="text-gray-200 hover:text-accent-400 text-sm mx-3 transition-colors">
                                Terms of Service
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        const checkAuth = () => {
            const token = localStorage.getItem('token');
            setIsLoggedIn(!!token);
        };

        checkAuth();
        // Listen for storage changes in other tabs
        window.addEventListener('storage', checkAuth);
        return () => window.removeEventListener('storage', checkAuth);
    }, [pathname]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setIsLoggedIn(false);
        router.push('/login');
    };

    const isActive = (path: string) => pathname === path;

    const linkClasses = (path: string) =>
        `inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-all duration-200 ${isActive(path)
            ? 'border-indigo-500 text-indigo-600'
            : 'border-transparent text-slate-500 hover:text-slate-900 hover:border-slate-300'
        }`;

    return (
        <nav className="bg-white/80 backdrop-blur-xl border-b border-slate-200 sticky top-0 z-50 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center gap-8">
                        <Link href="/" className="flex-shrink-0 flex items-center group">
                            <span className="text-2xl font-black bg-gradient-to-r from-indigo-600 to-rose-500 bg-clip-text text-transparent group-hover:opacity-80 transition-opacity">
                                SB.
                            </span>
                            <span className="hidden sm:block ml-2 text-slate-900 font-bold text-lg tracking-tight">
                                StartupBenefits
                            </span>
                        </Link>

                        <div className="hidden sm:flex sm:space-x-8 h-full">
                            <Link href="/" className={linkClasses('/')}>
                                Explore
                            </Link>
                            <Link href="/deals" className={linkClasses('/deals')}>
                                All Deals
                            </Link>
                        </div>
                    </div>

                    {/* Desktop Right Side */}
                    <div className="hidden sm:flex sm:items-center sm:space-x-4">
                        {isLoggedIn ? (
                            <>
                                <Link
                                    href="/dashboard"
                                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${isActive('/dashboard')
                                            ? 'bg-indigo-50 text-indigo-600'
                                            : 'text-slate-600 hover:bg-slate-50'
                                        }`}
                                >
                                    Dashboard
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="px-4 py-2 text-sm font-semibold text-rose-500 hover:text-rose-600 hover:bg-rose-50 rounded-full transition-all"
                                >
                                    Log out
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    className="text-sm font-semibold text-slate-600 hover:text-slate-900 px-4 py-2 transition-all"
                                >
                                    Sign in
                                </Link>
                                <Link
                                    href="/register"
                                    className="bg-slate-900 text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-slate-800 transition-all shadow-md shadow-slate-200"
                                >
                                    Get Started
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex items-center sm:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 transition-all"
                        >
                            <span className="sr-only">Open main menu</span>
                            {isOpen ? (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="sm:hidden bg-white border-t border-slate-100 overflow-hidden"
                    >
                        <div className="px-4 pt-2 pb-6 space-y-2">
                            <Link href="/" onClick={() => setIsOpen(false)} className="block px-4 py-3 text-base font-medium text-slate-600 hover:bg-slate-50 rounded-xl">Explore</Link>
                            <Link href="/deals" onClick={() => setIsOpen(false)} className="block px-4 py-3 text-base font-medium text-slate-600 hover:bg-slate-50 rounded-xl">All Deals</Link>

                            <div className="pt-4 mt-4 border-t border-slate-100 space-y-2">
                                {isLoggedIn ? (
                                    <>
                                        <Link href="/dashboard" onClick={() => setIsOpen(false)} className="block px-4 py-3 text-base font-bold text-indigo-600 hover:bg-indigo-50 rounded-xl tracking-tight">Go to Dashboard</Link>
                                        <button onClick={() => { handleLogout(); setIsOpen(false); }} className="w-full text-left px-4 py-3 text-base font-semibold text-rose-500 hover:bg-rose-50 rounded-xl">Sign out</button>
                                    </>
                                ) : (
                                    <>
                                        <Link href="/login" onClick={() => setIsOpen(false)} className="block px-4 py-3 text-base font-semibold text-slate-600 hover:bg-slate-50 rounded-xl">Sign in</Link>
                                        <Link href="/register" onClick={() => setIsOpen(false)} className="block px-4 py-3 text-base font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl text-center">Get Started — it's free</Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}


"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import api from '@/lib/api';
import Link from 'next/link';

interface Deal {
    _id: string;
    title: string;
    category: string;
}

interface Claim {
    _id: string;
    dealId: Deal | string; // Handle both populated and unpopulated cases safely
    status: string;
    createdAt: string;
    claimCode?: string;
}

export default function DashboardPage() {
    const [claims, setClaims] = useState<Claim[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchClaims = async () => {
            try {
                const response = await api.get('/claims');
                setClaims(response.data);
            } catch (err: any) {
                console.error("Failed to fetch claims:", err);
                // If 401, maybe redirect to login or show message
                if (err.response?.status === 401) {
                    setError("Please log in to view your dashboard.");
                } else {
                    setError("Failed to load your claimed deals.");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchClaims();
    }, []);

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-50">
                <div className="text-xl font-medium text-gray-600 animate-pulse">Loading dashboard...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl">
                <header className="mb-8">
                    <h1 className="text-3xl font-extrabold text-gray-900">My Dashboard</h1>
                    <p className="mt-2 text-gray-600">Manage your claimed deals and rewards.</p>
                </header>

                {error ? (
                    <div className="rounded-md bg-red-50 p-4 text-red-700 border border-red-200">
                        {error}
                    </div>
                ) : claims.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100">
                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        <h3 className="mt-2 text-sm font-medium text-gray-900">No claims found</h3>
                        <p className="mt-1 text-sm text-gray-500">You haven't claimed any deals yet.</p>
                        <div className="mt-6">
                            <Link href="/deals" className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                                Browse Deals
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="bg-white shadow overflow-hidden sm:rounded-md border border-gray-200">
                        <ul className="divide-y divide-gray-200">
                            {claims.map((claim, index) => {
                                // Handle case where dealId might be populated or just an ID
                                const deal = typeof claim.dealId === 'object' ? claim.dealId : { title: 'Unknown Deal', _id: claim.dealId } as Deal;

                                return (
                                    <motion.li
                                        key={claim._id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <div className="px-4 py-4 sm:px-6 hover:bg-gray-50 transition-colors duration-150">
                                            <div className="flex items-center justify-between">
                                                <div className="flex flex-col">
                                                    <p className="text-sm font-medium text-blue-600 truncate">
                                                        {deal.title}
                                                    </p>
                                                    <p className="text-xs text-gray-500 mt-1">
                                                        Claimed on {new Date(claim.createdAt).toLocaleDateString()}
                                                    </p>
                                                </div>
                                                <div className="flex items-center">
                                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                            ${claim.status === 'approved' ? 'bg-green-100 text-green-800' :
                                                            claim.status === 'rejected' ? 'bg-red-100 text-red-800' :
                                                                'bg-yellow-100 text-yellow-800'}`}>
                                                        {claim.status || 'Active'}
                                                    </span>
                                                </div>
                                            </div>
                                            {claim.claimCode && (
                                                <div className="mt-2 text-sm text-gray-700 bg-gray-50 p-2 rounded border border-gray-100 font-mono">
                                                    Code: {claim.claimCode}
                                                </div>
                                            )}
                                        </div>
                                    </motion.li>
                                );
                            })}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}

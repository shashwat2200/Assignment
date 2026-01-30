"use client";

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import api from '@/lib/api';

interface DealDetail {
    _id: string;
    title: string;
    description: string;
    category: string;
    partnerName: string;
    eligibilityCriteria: string;
    isLocked: boolean;
    expiryDate?: string;
    imageUrl?: string;
}

export default function DealDetailsPage() {
    const { id } = useParams();
    const router = useRouter();
    const [deal, setDeal] = useState<DealDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [claiming, setClaiming] = useState(false);
    const [claimSuccess, setClaimSuccess] = useState(false);

    useEffect(() => {
        if (!id) return;

        const fetchDeal = async () => {
            try {
                const response = await api.get(`/deals/${id}`);
                setDeal(response.data);
            } catch (err) {
                console.error("Failed to fetch deal details:", err);
                setError("Failed to load deal details.");
            } finally {
                setLoading(false);
            }
        };

        fetchDeal();
    }, [id]);

    const handleClaim = async () => {
        if (!deal || deal.isLocked) return;

        setClaiming(true);
        try {
            // Assuming existing backend endpoint for claiming
            await api.post('/claims', { dealId: deal._id });
            setClaimSuccess(true);
            setTimeout(() => {
                router.push('/dashboard'); // or wherever claims are listed
            }, 2000);
        } catch (err: any) {
            console.error("Failed to claim deal:", err);
            if (err.response?.status === 401) {
                // Redirect to login or show auth error
                alert("You must be logged in to claim this deal.");
            } else {
                alert("Failed to claim deal. Please try again.");
            }
        } finally {
            setClaiming(false);
        }
    };

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-50">
                <div className="text-xl font-medium text-gray-600 animate-pulse">Loading deal details...</div>
            </div>
        );
    }

    if (error || !deal) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-50 text-red-500">
                <div className="text-center">
                    <p className="text-xl font-semibold mb-4">{error || "Deal not found"}</p>
                    <button
                        onClick={() => router.back()}
                        className="text-blue-600 hover:underline"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <button
                    onClick={() => router.back()}
                    className="mb-6 text-sm text-gray-500 hover:text-gray-900 flex items-center transition-colors"
                >
                    ← Back to Deals
                </button>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
                >
                    {/* Header Section */}
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-8 py-10 text-white relative overflow-hidden">
                        <div className="relative z-10">
                            <div className="flex items-center space-x-2 text-blue-100 text-sm font-medium mb-3 uppercase tracking-wider">
                                <span>{deal.category}</span>
                                <span>•</span>
                                <span>{deal.partnerName}</span>
                            </div>
                            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2">
                                {deal.title}
                            </h1>
                            {deal.isLocked && (
                                <div className="mt-4 inline-flex items-center px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium text-white border border-white/30">
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                    Locked Deal
                                </div>
                            )}
                        </div>
                        {/* Decorative background circle */}
                        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white/10 blur-3xl"></div>
                    </div>

                    {/* Content Section */}
                    <div className="p-8">
                        <div className="prose max-w-none text-gray-600">
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Description</h3>
                            <p className="mb-8 leading-relaxed">
                                {deal.description}
                            </p>

                            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 mb-8">
                                <h3 className="text-lg font-bold text-gray-900 mb-3">Eligibility Criteria</h3>
                                <p className="text-sm text-gray-600">
                                    {deal.eligibilityCriteria}
                                </p>
                            </div>
                        </div>

                        {/* Action Section */}
                        <div className="mt-8 pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div>
                                <p className="text-xs text-gray-400">
                                    By claiming using this deal, you agree to the terms and conditions.
                                </p>
                            </div>

                            <button
                                onClick={handleClaim}
                                disabled={deal.isLocked || claiming || claimSuccess}
                                className={`
                   px-8 py-3 rounded-lg font-bold text-white shadow-lg transform transition-all duration-200
                   ${deal.isLocked
                                        ? 'bg-gray-400 cursor-not-allowed opacity-70'
                                        : claimSuccess
                                            ? 'bg-green-500 hover:bg-green-600'
                                            : 'bg-blue-600 hover:bg-blue-700 hover:-translate-y-1 hover:shadow-blue-500/30 active:scale-95'
                                    }
                   min-w-[160px] flex items-center justify-center
                 `}
                            >
                                {claiming ? (
                                    <span className="flex items-center">
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Processing
                                    </span>
                                ) : claimSuccess ? (
                                    "Claimed!"
                                ) : deal.isLocked ? (
                                    "Locked"
                                ) : (
                                    "Claim Deal"
                                )}
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

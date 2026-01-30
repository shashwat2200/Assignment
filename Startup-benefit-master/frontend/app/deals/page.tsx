"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import api from '@/lib/api';
import DealCard from '@/components/DealCard';

interface Deal {
    _id: string;
    title: string;
    category: string;
    isLocked: boolean;
    [key: string]: any;
}

const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
};

export default function DealsPage() {
    const [deals, setDeals] = useState<Deal[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchDeals = async () => {
            try {
                const response = await api.get('/deals');
                setDeals(response.data);
            } catch (err) {
                console.error("Failed to fetch deals:", err);
                setError("Failed to load deals. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchDeals();
    }, []);

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="text-2xl font-semibold text-gray-700 animate-pulse">
                        Loading exciting deals...
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-50">
                <div className="text-center text-red-500">
                    <p className="text-xl font-semibold">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
                <div className="mb-8">
                    <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl text-center mb-2">
                        Exclusive Deals
                    </h1>
                    <p className="text-center text-gray-500 max-w-2xl mx-auto">
                        Discover our hand-picked selection of premium offers just for you.
                    </p>
                </div>

                {deals.length === 0 ? (
                    <div className="text-center text-gray-500 py-12">
                        No deals available at the moment. Check back soon!
                    </div>
                ) : (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="show"
                        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                    >
                        {deals.map((deal) => (
                            <motion.div key={deal._id} variants={itemVariants}>
                                <DealCard
                                    title={deal.title}
                                    category={deal.category}
                                    isLocked={deal.isLocked}
                                    onClick={() => router.push(`/deals/${deal._id}`)}
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </div>
        </div>
    );
}

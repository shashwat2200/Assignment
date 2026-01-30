"use client";

import React from 'react';
import { motion } from 'framer-motion';
import LockedBadge from './LockedBadge';

interface DealCardProps {
    title: string;
    category: string;
    isLocked: boolean;
    onClick: () => void;
}

export default function DealCard({ title, category, isLocked, onClick }: DealCardProps) {
    return (
        <motion.div
            whileHover={{ y: -4, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
            transition={{ type: "spring", stiffness: 300 }}
            onClick={isLocked ? undefined : onClick}
            className={`
        relative overflow-hidden rounded-xl bg-white p-6 shadow-md border 
        ${isLocked ? 'cursor-not-allowed bg-gray-50 border-gray-200' : 'cursor-pointer border-gray-100 hover:border-blue-100'}
        transition-colors duration-200
      `}
        >
            <div className={`space-y-4 ${isLocked ? 'filter blur-[2px] select-none opacity-60' : ''}`}>
                <div className="flex items-center justify-between">
                    <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                        {category}
                    </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 leading-tight">
                    {title}
                </h3>

                <p className="text-sm text-gray-500">
                    Click to view deal details and redemption instructions.
                </p>
            </div>

            {isLocked && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/30">
                    <LockedBadge />
                </div>
            )}
        </motion.div>
    );
}

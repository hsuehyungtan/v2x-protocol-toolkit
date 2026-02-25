"use client";

import Image from "next/image";
import { useState, useMemo, useEffect } from "react";
import { getAssetPath } from "@/lib/utils";
import { calculateDateFromMoyAndTimestamp, calculateTenthOfSecondInHour } from "@/lib/v2x-time";

export default function TimeCalculator() {
    const [isMounted, setIsMounted] = useState(false);

    const [moy, setMoy] = useState(0);
    const [timestamp, setTimestamp] = useState(0);
    const [year, setYear] = useState(2024);

    useEffect(() => {
        setYear(new Date().getFullYear());
        setIsMounted(true);
    }, []);

    const calculatedDate = useMemo(() => {
        return calculateDateFromMoyAndTimestamp(moy, timestamp, year);
    }, [moy, timestamp, year]);

    const tenthOfSecondInHour = useMemo(() => {
        return calculateTenthOfSecondInHour(calculatedDate);
    }, [calculatedDate]);

    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-start py-32 px-16 bg-white dark:bg-black sm:items-start gap-12">
                <Image
                    className="dark:invert relative left-[50%] -translate-x-[50%] sm:left-0 sm:translate-x-0"
                    src={getAssetPath("/next.svg")}
                    alt="Next.js logo"
                    width={100}
                    height={20}
                    priority
                />

                <div className="flex w-full flex-col gap-6 max-w-md">
                    <div className="mb-4">
                        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">V2X Message Time Calculator</h1>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">Convert MOY & Timestamp into standard DateTime</p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="moy" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                            MOY (MinuteOfTheYear) <span className="text-xs text-zinc-500">(0..527040)</span>
                        </label>
                        <input
                            id="moy"
                            type="number"
                            min="0"
                            max="527040"
                            value={moy}
                            onChange={(e) => setMoy(e.target.value)}
                            className="rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="timestamp" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                            Timestamp <span className="text-xs text-zinc-500">(ms 0..65535)</span>
                        </label>
                        <input
                            id="timestamp"
                            type="number"
                            min="0"
                            max="65535"
                            value={timestamp}
                            onChange={(e) => setTimestamp(e.target.value)}
                            className="rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="year" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Year</label>
                        <input
                            id="year"
                            type="number"
                            value={year}
                            onChange={(e) => setYear(parseInt(e.target.value) || 0)}
                            className="rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
                        />
                    </div>

                    <div className="mt-8 p-6 rounded-lg bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
                        <h2 className="text-lg font-semibold mb-2 text-zinc-800 dark:text-zinc-200">Calculated Time (Local)</h2>
                        <div className="text-xl font-mono text-blue-600 dark:text-blue-400">
                            {!isMounted ? "..." : (calculatedDate ? `${calculatedDate.toLocaleDateString()} ${calculatedDate.toLocaleTimeString(undefined, { hour12: false })}` : "Invalid Date")}
                        </div>
                        <div className="mt-4 flex flex-col gap-1">
                            <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">TimeMark (0.1s from hour start): </span>
                            <span className="text-lg font-mono text-indigo-600 dark:text-indigo-400">
                                {!isMounted ? "-" : (tenthOfSecondInHour !== null ? tenthOfSecondInHour : "-")}
                            </span>
                        </div>
                        <div className="text-sm mt-4 pt-4 border-t border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-500">
                            ISO: {!isMounted ? "-" : (calculatedDate ? calculatedDate.toISOString() : "-")}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

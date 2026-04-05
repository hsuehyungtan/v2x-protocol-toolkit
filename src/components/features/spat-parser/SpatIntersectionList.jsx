import React from "react";
import IntersectionCard from "./IntersectionCard";

export default function SpatIntersectionList({ error, parsedData, intersections }) {
    if (error || !parsedData) {
        return (
            <div className="flex w-full flex-col gap-4">
                <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-2 opacity-0 select-none">
                    Parsed Intersections
                </h2>
                <div className="flex flex-col items-center justify-center h-[800px] rounded-xl border border-dashed border-zinc-300 bg-zinc-50/50 text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900/20 dark:text-zinc-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mb-4 opacity-50">
                        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                        <polyline points="14 2 14 8 20 8" />
                        <path d="m10 13-2 2 2 2" />
                        <path d="m14 17 2-2-2-2" />
                    </svg>
                    <span>Output will appear here</span>
                </div>
            </div>
        );
    }

    if (parsedData && intersections.length === 0) {
        return (
            <div className="flex w-full flex-col gap-4">
                <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                    Parsed Intersections
                </h2>
                <div className="h-[800px] p-4 rounded-md border border-yellow-200 bg-yellow-50 text-yellow-800 text-sm shadow-sm dark:border-yellow-900/50 dark:bg-yellow-900/20 dark:text-yellow-200">
                    JSON parsed successfully, but no intersections were found.
                </div>
            </div>
        );
    }

    return (
        <div className="flex w-full flex-col gap-4">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                Parsed Intersections
            </h2>
            <div className="h-[800px] overflow-y-auto flex flex-col gap-8 pr-2 custom-scrollbar">
                {intersections.map((intersection, idx) => (
                    <IntersectionCard key={idx} intersection={intersection} />
                ))}
            </div>
        </div>
    );
}

import React from "react";

export default function SpatInputArea({ jsonInput, error, handleInputChange }) {
    return (
        <div className="flex w-full flex-col gap-4">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                Paste your SPAT JSON
            </h2>
            <textarea
                className="h-[800px] w-full rounded-lg border border-zinc-200 bg-white p-4 text-sm font-mono text-zinc-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-blue-500 dark:focus:ring-blue-500/20 transition-all shadow-sm resize-none"
                placeholder="Paste SPAT JSON here..."
                value={jsonInput}
                onChange={handleInputChange}
            />
            
            {error && (
                <div className="p-3 rounded-md bg-red-50 text-red-600 text-sm border border-red-100 dark:bg-red-900/10 dark:text-red-400 dark:border-red-900/30">
                    {error}
                </div>
            )}
        </div>
    );
}

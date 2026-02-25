import React from "react";

export default function SpatParserPage() {
    return (
        <div className="flex min-h-screen flex-col items-center bg-zinc-50 py-32 px-16 font-sans dark:bg-black sm:items-start">
            <main className="flex w-full max-w-3xl flex-col items-center justify-start gap-12 sm:items-start mx-auto">
                <div className="w-full max-w-2xl flex flex-col gap-6">
                    <div>
                        <h1 className="mb-2 text-3xl font-bold text-zinc-900 dark:text-zinc-100">
                            SPAT JSON Parser
                        </h1>
                        <p className="text-base text-zinc-500 dark:text-zinc-400">
                            Paste your SPAT JSON to see the parsed signal groups.
                        </p>
                    </div>

                    <div className="flex w-full flex-col gap-4">
                        <textarea
                            className="min-h-[300px] w-full rounded-md border border-zinc-200 bg-white p-4 text-sm text-zinc-900 focus:border-zinc-400 focus:outline-none dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-zinc-700"
                            placeholder="Paste SPAT JSON here..."
                        />
                    </div>
                </div>
            </main>
        </div>
    );
}

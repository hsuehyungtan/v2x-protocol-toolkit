"use client";

import React from "react";
import { useSpatParser } from "@/hooks/useSpatParser";
import SpatInputArea from "@/components/features/spat-parser/SpatInputArea";
import SpatIntersectionList from "@/components/features/spat-parser/SpatIntersectionList";

export default function SpatParserPage() {
    const {
        jsonInput,
        parsedData,
        error,
        intersections,
        handleInputChange
    } = useSpatParser();

    return (
        <div className="flex flex-1 w-full py-16 px-8 sm:px-16 font-sans dark:bg-black">
            <main className="mx-auto flex w-full max-w-7xl flex-col gap-8">
                <div>
                    <h1 className="mb-6 text-3xl font-bold text-zinc-900 dark:text-zinc-100">
                        SPAT JSON Parser
                    </h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                    {/* Left Column: Text Input */}
                    <SpatInputArea
                        jsonInput={jsonInput}
                        error={error}
                        handleInputChange={handleInputChange}
                    />

                    {/* Right Column: Parsed Data Output */}
                    <SpatIntersectionList
                        error={error}
                        parsedData={parsedData}
                        intersections={intersections}
                    />
                </div>
            </main>
        </div>
    );
}

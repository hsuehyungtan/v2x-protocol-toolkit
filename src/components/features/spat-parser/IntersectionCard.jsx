import React, { useState } from "react";
import { calculateDateFromMoyAndTimestamp, calculateTenthOfSecondInHour } from "@/lib/v2x-time";
import IntersectionStatusBadge from "./IntersectionStatusBadge";
import EventStateList from "./EventStateList";

export default function IntersectionCard({ intersection }) {
    const [collapsedGroups, setCollapsedGroups] = useState(new Set());

    const toggleGroup = (key) => {
        setCollapsedGroups(prev => {
            const newSet = new Set(prev);
            if (newSet.has(key)) {
                newSet.delete(key);
            } else {
                newSet.add(key);
            }
            return newSet;
        });
    };

    const parsedDate = (intersection.moy !== undefined && intersection.timeStamp !== undefined)
        ? calculateDateFromMoyAndTimestamp(intersection.moy, intersection.timeStamp)
        : null;
    const timeMark = parsedDate ? calculateTenthOfSecondInHour(parsedDate) : null;

    return (
        <div className="flex flex-col gap-4 rounded-xl border border-zinc-200 bg-white p-6 shadow-md dark:border-zinc-800 dark:bg-zinc-900/40 shrink-0">
            {/* Intersection Header */}
            <div className="flex flex-col gap-2 pb-5 border-b border-zinc-100 dark:border-zinc-800/50">
                <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-3">
                    Intersection
                    <span className="text-xs font-medium px-2 py-1 rounded-md bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                        ID: {intersection.id?.id ?? 'N/A'}
                    </span>
                    {intersection.id?.region !== undefined && (
                        <span className="text-xs font-medium px-2 py-1 rounded-md bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                            Region: {intersection.id.region}
                        </span>
                    )}
                </h3>

                <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm mt-2 sm:flex sm:flex-wrap sm:gap-6">
                    <div className="flex items-start gap-2 w-full col-span-2 border-b border-zinc-100 dark:border-zinc-800 pb-3 mb-1 sm:pb-3 sm:mb-2 flex-col sm:flex-row">
                        <span className="text-zinc-500 dark:text-zinc-400 shrink-0 mt-1">Status:</span>
                        <IntersectionStatusBadge statusString={intersection.status} />
                    </div>
                    <div className="flex items-center gap-1.5">
                        <span className="text-zinc-500 dark:text-zinc-400">Revision:</span>
                        <span className="font-medium text-zinc-900 dark:text-zinc-100">{intersection.revision ?? 'N/A'}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <span className="text-zinc-500 dark:text-zinc-400">MOY:</span>
                        <span className="font-medium text-zinc-900 dark:text-zinc-100">{intersection.moy ?? 'N/A'}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <span className="text-zinc-500 dark:text-zinc-400">Timestamp:</span>
                        <span className="font-medium text-zinc-900 dark:text-zinc-100">{intersection.timeStamp ?? 'N/A'}</span>
                    </div>
                    {parsedDate && (
                        <div className="flex items-center gap-1.5 w-full sm:w-auto mt-2 sm:mt-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-zinc-100 dark:border-zinc-800 col-span-2">
                            <span className="text-zinc-500 dark:text-zinc-400">Calculated Time:</span>
                            <span className="font-medium text-blue-600 dark:text-blue-400 mr-2">
                                {parsedDate.toLocaleString()}
                            </span>
                            {timeMark !== null && (
                                <>
                                    <span className="text-zinc-300 dark:text-zinc-700 mx-1">|</span>
                                    <span className="text-zinc-500 dark:text-zinc-400">TimeMark:</span>
                                    <span className="font-medium text-indigo-600 dark:text-indigo-400">
                                        {timeMark}
                                    </span>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* States (Signal Groups) */}
            <div className="grid gap-4 mt-2">
                <h4 className="font-semibold text-zinc-900 dark:text-zinc-100">
                    Signal Groups (States)
                </h4>
                {intersection.states && intersection.states.length > 0 ? (
                    intersection.states.map((sg, sgIdx) => {
                        const groupKey = `${intersection.id?.id}-${sgIdx}`;
                        const isExpanded = !collapsedGroups.has(groupKey);

                        return (
                            <div key={sgIdx} className="rounded-lg border border-zinc-200 bg-zinc-50/70 overflow-hidden transition-colors hover:bg-zinc-50 dark:border-zinc-700/50 dark:bg-black/30 dark:hover:bg-zinc-900/50">
                                <button 
                                    onClick={() => toggleGroup(groupKey)}
                                    className="w-full flex items-center justify-between p-4 focus:outline-none"
                                >
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">Signal Group</span>
                                        <span className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                                            {sg.signalGroup !== undefined ? sg.signalGroup : '?'}
                                        </span>
                                    </div>
                                    <div className="flex h-6 w-6 items-center justify-center text-2xl font-mono leading-none text-zinc-400 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300">
                                        {isExpanded ? '-' : '+'}
                                    </div>
                                </button>
                                
                                {isExpanded && (
                                    <div className="px-4 pb-4 pt-1 border-t border-zinc-200/50 dark:border-zinc-800">
                                        <EventStateList states={sg.state_time_speed || sg['state-time-speed']} timeMark={timeMark} />
                                    </div>
                                )}
                            </div>
                        );
                    })
                ) : (
                    <div className="text-sm text-zinc-500 dark:text-zinc-400 italic">No states found for this intersection.</div>
                )}
            </div>
        </div>
    );
}

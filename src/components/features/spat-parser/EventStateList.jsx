import React from 'react';
import { EVENT_STATE_MAP, sortEventStates, calculateSpatDuration } from '@/lib/spat-utils';

export default function EventStateList({ states, timeMark }) {
    if (!states || !Array.isArray(states) || states.length === 0) {
        return <div className="text-sm text-zinc-500 italic">No state timing data available.</div>;
    }

    const sortedStates = sortEventStates(states);

    return (
        <div className="flex flex-col gap-2">
            {sortedStates.map((st, idx) => {
                const eventInfo = EVENT_STATE_MAP[st.eventState] || {
                    label: `未知狀態 (${st.eventState})`,
                    desc: 'Unknown',
                    color: 'bg-zinc-100 text-zinc-700 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:border-zinc-700'
                };

                const timing = st.timing || {};

                let durationBlock = null;
                const durationValue = idx === 0 
                    ? calculateSpatDuration(timing.minEndTime, timeMark)
                    : calculateSpatDuration(timing.minEndTime, timing.startTime);

                if (durationValue !== null) {
                    const labelText = idx === 0 ? "剩餘" : "時長";
                    const valueColorClass = idx === 0 
                        ? "text-blue-600 dark:text-blue-400" 
                        : "text-indigo-600 dark:text-indigo-400";
                    
                    durationBlock = (
                        <div className="flex flex-col mt-2 sm:mt-0 sm:items-end w-full sm:w-20 border-t sm:border-t-0 sm:border-l border-zinc-100 dark:border-zinc-800 pt-2 sm:pt-0 sm:pl-4 pl-0 ml-0 sm:ml-2">
                            <span className="text-zinc-500 dark:text-zinc-400 text-[10px]">{labelText}</span>
                            <span className={`font-mono text-sm font-bold ${valueColorClass}`}>{durationValue}s</span>
                        </div>
                    );
                }

                return (
                    <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-md bg-white border border-zinc-200 shadow-sm dark:bg-[#0a0a0a] dark:border-zinc-800">
                        <div className="flex flex-col gap-1 w-full sm:w-64 shrink-0">
                            <div className="flex items-center gap-2">
                                <span className={`text-xs font-semibold px-2 py-0.5 rounded border ${eventInfo.color}`}>
                                    {eventInfo.label}
                                </span>
                            </div>
                            <span className="text-[10px] text-zinc-400 dark:text-zinc-500">
                                {eventInfo.desc}
                            </span>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center w-full sm:flex-1 sm:justify-between">
                            <div className="flex flex-wrap gap-x-2 gap-y-1 w-full sm:w-auto text-xs">
                                <div className="flex flex-col w-12 sm:w-16">
                                    <span className="text-zinc-500 dark:text-zinc-400 text-[10px]">Start Time</span>
                                    <span className={`font-mono font-medium ${timing.startTime !== undefined ? 'text-zinc-900 dark:text-zinc-100' : 'text-zinc-300 dark:text-zinc-700'}`}>
                                        {timing.startTime !== undefined ? timing.startTime : '-'}
                                    </span>
                                </div>
                                <div className="flex flex-col w-16 sm:w-[4.5rem]">
                                    <span className="text-zinc-500 dark:text-zinc-400 text-[10px]">Min End Time</span>
                                    <span className={`font-mono font-medium ${timing.minEndTime !== undefined ? 'text-zinc-900 dark:text-zinc-100' : 'text-zinc-300 dark:text-zinc-700'}`}>
                                        {timing.minEndTime !== undefined ? timing.minEndTime : '-'}
                                    </span>
                                </div>
                            </div>
                            {durationBlock}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

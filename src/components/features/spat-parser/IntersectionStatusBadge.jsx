import React from 'react';

const STATUS_BITS = {
    0: '手動控制', // manualControlIsEnabled
    1: '運作時間鎖定', // stopTimeIsActivated
    2: '故障閃燈', // failureFlash
    3: '絕對優先', // preemptIsActive
    4: '條件優先', // signalPriorityIsActive
    5: '定時控制', // fixedTimeOperation
    8: '異常', // failureMode
    9: '關閉執行', // off
};

// Colors mapping depending on the severity/type of status
const STATUS_COLORS = {
    // Warnings / Errors (Red)
    2: 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-900/50',
    8: 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-900/50',
    
    // Warnings (Yellow / Orange)
    12: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-900/50',
    13: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-900/50',
    
    // Neutral Modes (Gray)
    7: 'bg-zinc-100 text-zinc-700 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:border-zinc-700',
    9: 'bg-zinc-100 text-zinc-700 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:border-zinc-700',
    
    // Operations (Green)
    5: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-900/50',
    6: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-900/50',
    
    // Others (Blue)
    default: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-900/50'
};

export default function IntersectionStatusBadge({ statusString }) {
    if (statusString === undefined || statusString === null) {
        return <span className="font-medium text-zinc-900 dark:text-zinc-100">N/A</span>;
    }

    let bitString = statusString.toString();
    
    // Attempt to handle cases where it might be parsed as an integer or Hex
    if (/^\d+$/.test(bitString) && !/^[01]+$/.test(bitString)) {
        // Decimal number to binary
        bitString = parseInt(bitString, 10).toString(2).padStart(16, '0');
    }

    const activeStates = [];
    
    for (let i = 0; i < bitString.length; i++) {
        if (bitString[i] === '1') {
            activeStates.push({
                index: i,
                name: STATUS_BITS[i] || `Unknown Bit ${i}`
            });
        }
    }

    if (activeStates.length === 0) {
        return (
            <div className="flex flex-col gap-1 w-full">
                <span className="font-medium text-zinc-900 dark:text-zinc-100 break-all">{bitString}</span>
                <span className="text-xs text-zinc-500">(No active flags)</span>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-2 w-full">
            <div className="flex flex-wrap gap-2">
                {activeStates.map((state) => {
                    const colorClass = STATUS_COLORS[state.index] || STATUS_COLORS.default;
                    return (
                        <div 
                            key={state.index}
                            className={`text-xs font-semibold px-2.5 py-1 rounded-md border ${colorClass}`}
                            title={`Bit Array Index: ${state.index}`}
                        >
                            {state.name}
                        </div>
                    );
                })}
            </div>
            <div className="text-xs text-zinc-400 dark:text-zinc-500 font-mono mt-0.5">
                Raw: {bitString}
            </div>
        </div>
    );
}

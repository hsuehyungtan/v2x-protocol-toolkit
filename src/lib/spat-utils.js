export const EVENT_STATE_MAP = {
    0: { label: '故障', desc: 'Unavailable', color: 'bg-zinc-100 text-zinc-700 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:border-zinc-700' },
    1: { label: '無啟用', desc: 'Dark', color: 'bg-zinc-100 text-zinc-700 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:border-zinc-700' },
    2: { label: '紅燈停車再開', desc: 'Stop Then Proceed', color: 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-900/50' },
    3: { label: '紅燈停等', desc: 'Stop And Remain', color: 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-900/50' },
    4: { label: '綠燈預告綠燈', desc: 'Pre-Movement', color: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-900/50' },
    5: { label: '允許綠燈（圓燈）', desc: 'Permissive Movement Allowed', color: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-900/50' },
    6: { label: '保護綠燈（箭頭）', desc: 'Protected Movement Allowed', color: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-900/50' },
    7: { label: '允許黃燈（行人閃綠）', desc: 'Permissive Clearance', color: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-900/50' },
    8: { label: '保護黃燈', desc: 'Protected Clearance', color: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-900/50' },
    9: { label: '閃光號誌', desc: 'Caution Conflicting Traffic', color: 'bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-900/50' },
};

/**
 * Parses duration logic or computes remaining time.
 */
export function calculateSpatDuration(minEndTime, startTimeOrMark) {
    if (minEndTime === undefined || startTimeOrMark === undefined || startTimeOrMark === null) return null;
    let diff = minEndTime - startTimeOrMark;
    if (diff < 0) diff += 36000;
    return (diff / 10).toFixed(1);
}

/**
 * Sorts event states resolving cross-hour rollover cases.
 */
export function sortEventStates(states) {
    if (!states || !Array.isArray(states)) return [];
    let sortedStates = [...states].sort((a, b) => {
        const tA = a.timing?.startTime ?? 0;
        const tB = b.timing?.startTime ?? 0;
        return tA - tB;
    });

    const rolloverIndex = sortedStates.findIndex(st => {
        if (!st.timing || st.timing.startTime === undefined || st.timing.minEndTime === undefined) return false;
        return st.timing.minEndTime < st.timing.startTime;
    });

    if (rolloverIndex !== -1) {
        const rolloverEnd = sortedStates[rolloverIndex].timing.minEndTime;
        const group1 = sortedStates.filter(st => (st.timing?.startTime ?? 0) > rolloverEnd);
        const group2 = sortedStates.filter(st => (st.timing?.startTime ?? 0) <= rolloverEnd);
        sortedStates = [...group1, ...group2];
    }
    return sortedStates;
}

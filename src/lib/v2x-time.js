/**
 * Calculate Date from MOY (Minute of the Year), Timestamp, and Year.
 * @param {number|string} moy - Minute of the Year (0..527040)
 * @param {number|string} timestamp - Milliseconds since the start of the minute (0..65535)
 * @param {number} [year] - The year (defaults to current year if omitted)
 * @returns {Date|null} The calculated Date object, or null if input is invalid
 */
export function calculateDateFromMoyAndTimestamp(moy, MathTimestamp, year = new Date().getFullYear()) {
    if (year === null || isNaN(year)) return null;

    // Create date for Jan 1st of the specified year (using local timezone)
    const startDate = new Date(year, 0, 1, 0, 0, 0, 0);

    // Add MOY (minutes) and timestamp (milliseconds)
    // MOY max is 527040 (minutes in a leap year)
    // timestamp is 0..65535 milliseconds
    const totalMs = startDate.getTime() + (Number(moy) * 60 * 1000) + Number(MathTimestamp);

    const resultDate = new Date(totalMs);

    // Check if valid date
    if (isNaN(resultDate.getTime())) return null;

    return resultDate;
}

/**
 * Calculate the TimeMark (0.1 seconds from start of the hour) from a Date object.
 * @param {Date} date - The Date object calculated from MOY and Timestamp
 * @returns {number|null} TimeMark, or null if date is invalid
 */
export function calculateTenthOfSecondInHour(date) {
    if (!date) return null;

    const min = date.getMinutes();
    const sec = date.getSeconds();
    const ms = date.getMilliseconds();

    const totalMsInHour = (min * 60 * 1000) + (sec * 1000) + ms;
    // 1 unit = 0.1 seconds (100 ms)
    return Math.floor(totalMsInHour / 100);
}

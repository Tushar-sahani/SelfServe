/**
 * Format numbers into short forms (K, M, B).
 * @param {number} number - The number to format.
 * @returns {string} - The formatted number with appropriate suffix.
 */
export const useShortNumber = (number) => {
    if (number < 1000) return number.toString();
    if (number < 1_000_000) return `${(number / 1000).toFixed(1)}k`;
    if (number < 1_000_000_000) return `${(number / 1_000_000).toFixed(1)}m`;
    return `${(number / 1_000_000_000).toFixed(1)}b`;
  };
  
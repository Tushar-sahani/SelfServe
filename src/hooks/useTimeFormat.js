import { useMemo } from 'react';

const useTimeFormat = (timeString) => {
  return useMemo(() => {
    if (!timeString) return '';

    const [hours, minutes] = timeString.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;

    return `${formattedHours}:${minutes.toString().padStart(2, '0')} ${period}`;
  }, [timeString]);
};

export default useTimeFormat;
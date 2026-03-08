export const getPostTime = (date: string): string => {
    const TIMEZONE_OFFSET = (2 * 60 * 60 - 5) * 1000;
    const seconds = Math.floor(
      (Date.now() - new Date(date).getTime() - TIMEZONE_OFFSET) / 1000,
    );
    new Date().toLocaleString();
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) {
      return `${minutes}m`;
    }
    const hours = Math.floor(minutes / 60);
    if (hours < 24) {
      return `${hours}h`;
    }
    const days = Math.floor(hours / 24);
    if (days < 7) {
      return `${days}d`;
    }
    const weeks = Math.floor(days / 7);
    if (days < 30) {
        return `${weeks}w`;
    }
    const months = Math.floor(days / 30);
    if (days < 365) {
        return `${months}m`;
    }
    const years = Math.floor(days / 365)
    return `${years}y`;
  };

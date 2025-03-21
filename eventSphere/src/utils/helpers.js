/**
 * Formats a date string to a more readable format
 * @param {string} dateStr - ISO date string
 * @returns {string} - Formatted date string
 */
export const formatDate = (dateStr) => {
    const options = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateStr).toLocaleDateString(undefined, options);
  };
  
  /**
   * Truncates text to a specified length
   * @param {string} text - The text to truncate
   * @param {number} maxLength - Maximum length before truncation
   * @returns {string} - Truncated text with ellipsis if needed
   */
  export const truncateText = (text, maxLength = 100) => {
    if (!text || text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };
  
  /**
   * Checks if a date is in the past
   * @param {string} dateStr - ISO date string
   * @returns {boolean} - True if date is in the past
   */
  export const isPastEvent = (dateStr) => {
    const eventDate = new Date(dateStr);
    const now = new Date();
    return eventDate < now;
  };
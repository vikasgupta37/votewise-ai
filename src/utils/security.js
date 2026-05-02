/**
 * Input sanitization utility for security.
 * Prevents XSS and prompt injection attacks.
 */

const MAX_INPUT_LENGTH = 500;
const RATE_LIMIT_MS = 2000; // 2 seconds between requests

let lastRequestTime = 0;

/**
 * Sanitizes user input to prevent XSS.
 * @param {string} input - Raw user input
 * @returns {string} Sanitized input
 */
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return '';
  return input
    .trim()
    .slice(0, MAX_INPUT_LENGTH)
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

/**
 * Validates that input is not empty and not too long.
 * @param {string} input
 * @returns {{ valid: boolean, error?: string }}
 */
export const validateInput = (input) => {
  if (!input || input.trim().length === 0) {
    return { valid: false, error: 'Input cannot be empty.' };
  }
  if (input.trim().length > MAX_INPUT_LENGTH) {
    return { valid: false, error: `Input cannot exceed ${MAX_INPUT_LENGTH} characters.` };
  }
  return { valid: true };
};

/**
 * Simple client-side rate limiter to prevent API abuse.
 * @returns {{ allowed: boolean, waitTime?: number }}
 */
export const checkRateLimit = () => {
  const now = Date.now();
  const timeSinceLastRequest = now - lastRequestTime;

  if (timeSinceLastRequest < RATE_LIMIT_MS) {
    return {
      allowed: false,
      waitTime: Math.ceil((RATE_LIMIT_MS - timeSinceLastRequest) / 1000),
    };
  }

  lastRequestTime = now;
  return { allowed: true };
};

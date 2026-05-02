import { describe, it, expect, vi, beforeEach } from 'vitest';
import { sanitizeInput, validateInput, checkRateLimit } from '../utils/security';

describe('sanitizeInput', () => {
  it('trims whitespace', () => {
    expect(sanitizeInput('  hello  ')).toBe('hello');
  });

  it('escapes HTML special characters', () => {
    expect(sanitizeInput('<script>alert("xss")</script>')).toContain('&lt;script&gt;');
  });

  it('limits input to 500 characters', () => {
    const longInput = 'a'.repeat(600);
    expect(sanitizeInput(longInput).length).toBe(500);
  });

  it('returns empty string for non-string input', () => {
    expect(sanitizeInput(null)).toBe('');
    expect(sanitizeInput(123)).toBe('');
  });
});

describe('validateInput', () => {
  it('returns valid for proper input', () => {
    expect(validateInput('What is EVM?').valid).toBe(true);
  });

  it('returns invalid for empty string', () => {
    expect(validateInput('').valid).toBe(false);
  });

  it('returns invalid for whitespace-only string', () => {
    expect(validateInput('   ').valid).toBe(false);
  });

  it('returns invalid for input exceeding 500 characters', () => {
    expect(validateInput('a'.repeat(501)).valid).toBe(false);
  });
});

describe('checkRateLimit', () => {
  beforeEach(() => {
    // Reset rate limit state between tests by advancing time
    vi.useFakeTimers();
    vi.advanceTimersByTime(3000);
  });

  it('allows the first request', () => {
    const result = checkRateLimit();
    expect(result.allowed).toBe(true);
  });

  it('blocks rapid consecutive requests', () => {
    checkRateLimit(); // First request
    const result = checkRateLimit(); // Immediate second request
    expect(result.allowed).toBe(false);
    expect(result.waitTime).toBeGreaterThan(0);
  });
});

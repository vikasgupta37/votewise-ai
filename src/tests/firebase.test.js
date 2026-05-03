import { describe, it, expect, vi } from 'vitest';

vi.mock('firebase/app', () => ({ initializeApp: vi.fn(() => ({ name: 'mock-app' })) }));
vi.mock('firebase/analytics', () => ({ getAnalytics: vi.fn(() => ({})), logEvent: vi.fn() }));
vi.mock('firebase/database', () => ({
    getDatabase: vi.fn(() => ({})),
    ref: vi.fn(() => ({})),
    push: vi.fn(() => Promise.resolve()),
    query: vi.fn(() => ({})),
    orderByChild: vi.fn(),
    limitToLast: vi.fn(),
    onValue: vi.fn((ref, callback) => { callback({ forEach: vi.fn() }); return vi.fn(); }),
}));

describe('Firebase Service', () => {
    it('logAnalyticsEvent does not throw', async () => {
          const { logAnalyticsEvent } = await import('../services/firebase');
          expect(() => logAnalyticsEvent('test_event', { key: 'value' })).not.toThrow();
    });

           it('trackPageView does not throw', async () => {
                 const { trackPageView } = await import('../services/firebase');
                 expect(() => trackPageView('Quiz Mode')).not.toThrow();
           });

           it('submitScore resolves without error', async () => {
                 const { submitScore } = await import('../services/firebase');
                 await expect(submitScore('TestUser', 150, 2)).resolves.not.toThrow();
           });

           it('submitScore handles anonymous user', async () => {
                 const { submitScore } = await import('../services/firebase');
                 await expect(submitScore(null, 0, 1)).resolves.not.toThrow();
           });

           it('getTopScores calls callback with array', async () => {
                 const { getTopScores } = await import('../services/firebase');
                 const cb = vi.fn();
                 getTopScores(cb);
                 expect(cb).toHaveBeenCalledWith(expect.any(Array));
           });

           it('getTopScores returns unsubscribe function', async () => {
                 const { getTopScores } = await import('../services/firebase');
                 const result = getTopScores(vi.fn());
                 expect(typeof result).toBe('function');
           });
});

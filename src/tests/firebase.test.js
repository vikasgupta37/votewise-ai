import { describe, it, expect, vi } from 'vitest';
vi.mock('firebase/app', () => ({ initializeApp: vi.fn(() => ({ name: 'mock' })) }));
vi.mock('firebase/analytics', () => ({ getAnalytics: vi.fn(() => ({})), logEvent: vi.fn() }));
vi.mock('firebase/database', () => ({
      getDatabase: vi.fn(() => ({})), ref: vi.fn(() => ({})),
      push: vi.fn(() => Promise.resolve()), query: vi.fn(() => ({})),
      orderByChild: vi.fn(), limitToLast: vi.fn(),
      onValue: vi.fn((r, cb) => { cb({ forEach: vi.fn() }); return vi.fn(); }),
}));
describe('Firebase Service', () => {
      it('logAnalyticsEvent does not throw', async () => {
              const { logAnalyticsEvent } = await import('../services/firebase');
              expect(() => logAnalyticsEvent('test_event')).not.toThrow();
      });
      it('trackPageView does not throw', async () => {
              const { trackPageView } = await import('../services/firebase');
              expect(() => trackPageView('Quiz')).not.toThrow();
      });
      it('submitScore resolves', async () => {
              const { submitScore } = await import('../services/firebase');
              await expect(submitScore('User', 100, 1)).resolves.not.toThrow();
      });
      it('getTopScores calls callback', async () => {
              const { getTopScores } = await import('../services/firebase');
              const cb = vi.fn();
              getTopScores(cb);
              expect(cb).toHaveBeenCalledWith(expect.any(Array));
      });
});

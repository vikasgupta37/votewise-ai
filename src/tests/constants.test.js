import { describe, it, expect } from 'vitest';
import { QUIZ_QUESTIONS, FLASHCARDS, MYTHS, SIMULATION_STEPS, TIMELINE_EVENTS, LANGUAGES, MODES } from '../constants';

describe('Constants - Data Integrity', () => {
  describe('QUIZ_QUESTIONS', () => {
    it('contains at least 3 questions', () => {
      expect(QUIZ_QUESTIONS.length).toBeGreaterThanOrEqual(3);
    });

    it('every question has required fields', () => {
      QUIZ_QUESTIONS.forEach((q, i) => {
        expect(q, `Question ${i + 1}`).toHaveProperty('question');
        expect(q, `Question ${i + 1}`).toHaveProperty('options');
        expect(q, `Question ${i + 1}`).toHaveProperty('correctAnswer');
        expect(q.options.length, `Question ${i + 1} options`).toBe(4);
        expect(q.correctAnswer, `Question ${i + 1} correctAnswer`).toBeGreaterThanOrEqual(0);
        expect(q.correctAnswer, `Question ${i + 1} correctAnswer`).toBeLessThan(4);
      });
    });
  });

  describe('FLASHCARDS', () => {
    it('contains at least 5 flashcards', () => {
      expect(FLASHCARDS.length).toBeGreaterThanOrEqual(5);
    });

    it('every flashcard has term, definition, and category', () => {
      FLASHCARDS.forEach((card, i) => {
        expect(card.term, `Card ${i + 1}`).toBeTruthy();
        expect(card.definition, `Card ${i + 1}`).toBeTruthy();
        expect(card.category, `Card ${i + 1}`).toBeTruthy();
      });
    });
  });

  describe('MYTHS', () => {
    it('contains at least 4 myths', () => {
      expect(MYTHS.length).toBeGreaterThanOrEqual(4);
    });

    it('every myth has myth and fact fields', () => {
      MYTHS.forEach((item, i) => {
        expect(item.myth, `Myth ${i + 1}`).toBeTruthy();
        expect(item.fact, `Fact ${i + 1}`).toBeTruthy();
      });
    });
  });

  describe('SIMULATION_STEPS', () => {
    it('has exactly 4 steps', () => {
      expect(SIMULATION_STEPS.length).toBe(4);
    });

    it('every step has title, description, and action', () => {
      SIMULATION_STEPS.forEach((step, i) => {
        expect(step.title, `Step ${i + 1}`).toBeTruthy();
        expect(step.description, `Step ${i + 1}`).toBeTruthy();
        expect(step.action, `Step ${i + 1}`).toBeTruthy();
      });
    });
  });

  describe('LANGUAGES and MODES', () => {
    it('includes English in languages', () => {
      expect(LANGUAGES).toContain('English');
    });

    it('includes Simple in modes', () => {
      expect(MODES).toContain('Simple');
    });

    it('has 4 languages', () => {
      expect(LANGUAGES.length).toBe(4);
    });
  });
});

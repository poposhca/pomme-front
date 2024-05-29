import quizBlockIterator from './QuizBlockIterator';
import { QuizItemsTypes } from '../models/index.ts';
import * as quiz from '../../mockData/mockQuizWithBlocks.json';

describe('Quiz Block Iterator', () => {
    it('should return the length of the quiz', () => {
        const iterator = quizBlockIterator(quiz);
        const length = iterator.getLength();
        expect(length).toBe(6);
    });

    it('should return the first question', () => {
        const iterator = quizBlockIterator(quiz);
        const question = iterator.currentQuestion();
        const currentQuestionIndex = iterator.getCurrent();
        expect(question.type).toBe(QuizItemsTypes.TitlePresentation);
        expect(question.item.title).toBe('WELCOME');
        expect(currentQuestionIndex).toBe(0);
    });

    it('should return the second question', () => {
        const iterator = quizBlockIterator(quiz);
        iterator.next();
        const question = iterator.currentQuestion();
        const currentQuestionIndex = iterator.getCurrent();
        expect(question.type).toBe(QuizItemsTypes.TitlePresentation);
        expect(question.item.title).toBe('SLIDE 1');
        expect(currentQuestionIndex).toBe(1);
    });

    it('should return the fourth question', () => {
        const iterator = quizBlockIterator(quiz);
        iterator.next();
        iterator.next();
        iterator.next();
        iterator.next();
        const question = iterator.currentQuestion();
        const currentQuestionIndex = iterator.getCurrent();
        expect(question.type).toBe(QuizItemsTypes.TitlePresentation);
        expect(question.item.title).toBe('SLIDE 4');
        expect(currentQuestionIndex).toBe(4);
    });

    it('should return to the second question', () => {
        const iterator = quizBlockIterator(quiz);
        iterator.next();
        iterator.next();
        iterator.next();
        iterator.next();
        iterator.previous();
        iterator.previous();
        const question = iterator.currentQuestion();
        const currentQuestionIndex = iterator.getCurrent();
        expect(question.type).toBe(QuizItemsTypes.TitlePresentation);
        expect(question.item.title).toBe('SLIDE 2');
        expect(currentQuestionIndex).toBe(2);
    });

    it('should go to the second slide', () => {
        const iterator = quizBlockIterator(quiz);
        const question = iterator.goTo(2);
        const currentQuestionIndex = iterator.getCurrent();
        expect(question.item.title).toBe('SLIDE 2');
        expect(currentQuestionIndex).toBe(2);
    });

    it('should go to the fourth slide', () => {
        const iterator = quizBlockIterator(quiz);
        const question = iterator.goTo(4);
        const currentQuestionIndex = iterator.getCurrent();
        expect(question.item.title).toBe('SLIDE 4');
        expect(currentQuestionIndex).toBe(4);
    });

    it('should go to the fourth slide', () => {
        const iterator = quizBlockIterator(quiz);
        const question = iterator.goTo(5);
        const currentQuestionIndex = iterator.getCurrent();
        expect(question.item.title).toBe('SLIDE 5');
        expect(currentQuestionIndex).toBe(5);
    });

    it('should go and return to the third slide', () => {
        const iterator = quizBlockIterator(quiz);
        const firstResultQuestion = iterator.goTo(5);
        const firstResultQuestionIndex = iterator.getCurrent();
        const question = iterator.goTo(3);
        const currentQuestionIndex = iterator.getCurrent();
        expect(firstResultQuestion.item.title).toBe('SLIDE 5');
        expect(firstResultQuestionIndex).toBe(5);
        expect(question.item.title).toBe('SLIDE 3');
        expect(currentQuestionIndex).toBe(3);
    });

    it('should go and return to the second slide', () => {
        const iterator = quizBlockIterator(quiz);
        const firstResultQuestion = iterator.goTo(5);
        const firstResultQuestionIndex = iterator.getCurrent();
        const question = iterator.goTo(2);
        const currentQuestionIndex = iterator.getCurrent();
        expect(firstResultQuestion.item.title).toBe('SLIDE 5');
        expect(firstResultQuestionIndex).toBe(5);
        expect(question.item.title).toBe('SLIDE 2');
        expect(currentQuestionIndex).toBe(2);
    });

    it ('should throw an error when the index is out of bounds', () => {
        const iterator = quizBlockIterator(quiz);
        expect(() => iterator.goTo(6)).toThrow('Index out of bounds');
    });

    it ('should throw an error when the index negative', () => {
        const iterator = quizBlockIterator(quiz);
        expect(() => iterator.goTo(-1)).toThrow('Index out of bounds');
    });
});

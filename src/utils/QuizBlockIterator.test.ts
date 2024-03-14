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
});

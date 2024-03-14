import QuizItem from "./QuizItem.ts";

interface IQuizIterator {
    goTo: (index: number) => QuizItem;
    currentQuestion: () => QuizItem;
    previous: () => QuizItem;
    next: () => QuizItem;
    resetBlock: () => QuizItem;
    getCurrent: () => number;
    getLength: () => number;
}

export default IQuizIterator;

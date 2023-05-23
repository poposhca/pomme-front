import QuizItem from "./QuizItem.ts";

interface IQuizIterator {
    goTo: (index: number) => QuizItem;
    currentQuestion: () => QuizItem;
    previous: () => QuizItem;
    next: () => QuizItem;
}

export default IQuizIterator;

import IQuizIterator from "../models/IQuizIterator.ts";
import QuizItem from "../models/QuizItem.ts";

const quizIterator = (items: QuizItem[]): IQuizIterator => {
    let actualIndex = 0;
    return ({
        goTo: (index: number) => {
            actualIndex = index;
            return items[actualIndex];
        },
        currentQuestion: () => items[actualIndex],
        previous: () => {
            actualIndex--;
            return items[actualIndex];
        },
        next: () => {
            actualIndex++;
            return items[actualIndex];
        }
    });
}

export default quizIterator;

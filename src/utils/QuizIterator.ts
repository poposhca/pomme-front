import IQuizIterator from "../models/IQuizIterator.ts";
import QuizItem from "../models/QuizItem.ts";

const quizIterator = (items: QuizItem[]): IQuizIterator => {
    let actualIndex = 0;
    return ({
        goTo: (index: number) => {
            if(index < 0 || index >= items.length) throw new Error("Index out of bounds");
            actualIndex = index;
            return items[actualIndex];
        },
        currentQuestion: () => items[actualIndex],
        previous: () => {
            if(actualIndex !== 0) {
                actualIndex--;
            }
            return items[actualIndex];
        },
        next: () => {
            if(actualIndex !== items.length - 1) {
                actualIndex++;
            }
            return items[actualIndex];
        },
        getCurrent: () => actualIndex,
        getLength: () => items.length,
    });
}

export default quizIterator;

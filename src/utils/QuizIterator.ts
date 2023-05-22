import IQuizIterator from "../models/IQuizIterator.ts";
import Option from "../models/Option.ts";

const QuizIterator = (options: Option[]): IQuizIterator => {
    let actualIndex = 0;
    return ({
        goTo: (index: number) => {
            actualIndex = index;
            return options[actualIndex];
        },
        previous: () => {
            actualIndex--;
            return options[actualIndex];
        },
        next: () => {
            actualIndex++;
            return options[actualIndex];
        }
    });
}

export default QuizIterator;

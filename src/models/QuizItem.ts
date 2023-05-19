import MultipleOptionQuestion from "./MultipleOptionQuestion.ts";
import QuizItemsTypes from "./QuizItemsTypes.ts";

interface QuizItem {
    type: QuizItemsTypes;
    item: MultipleOptionQuestion;
}

export default QuizItem;

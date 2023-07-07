import MultipleOptionQuestion from "./MultipleOptionQuestion.ts";
import PresentationSlide from "./PresentationSlide.ts";

type QuizItem = {
    type: string;
    item: MultipleOptionQuestion | PresentationSlide;
}

export default QuizItem;

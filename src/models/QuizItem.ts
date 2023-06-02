import MultipleOptionQuestion from "./MultipleOptionQuestion.ts";
import PresentationSlide from "./PresentationSlide.ts";

interface QuizItem {
    type: string;
    item: MultipleOptionQuestion | PresentationSlide;
}

export default QuizItem;

import MultipleOptionQuestion from "./MultipleOptionQuestion.ts";
import PresentationSlide from "./PresentationSlide.ts";
import TitlePresentationItem from "./TitlePresentationItem.ts";

type QuizItem = {
    type: string;
    item: MultipleOptionQuestion | PresentationSlide | TitlePresentationItem;
}

export default QuizItem;

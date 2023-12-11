import QuizItemsTypes from "../../models/QuizItemsTypes.ts";
import QuizItem from "../../models/QuizItem.ts";
import IQuizInteractionHandler from "../../models/IQuizInteractionHandler.ts";
import QuizStart from "../../components/QuizStart";
import Presentation from "../../components/Presentation";
import MultipleOptionResults from "../../components/MultipleOptionResults";
import MultipleOptionQuestion from "../../models/MultipleOptionQuestion.ts";
import SingleAnswer from "../../components/SingleAnswer";
import MultipleAnswer from "../../components/MultipleAnswer";
import TitlePresentation, { TitlePresentationItem } from "../../components/TitlePresentation";
import TitleImagePresentation, { TitleImagePresentationItem } from "../../components/TitleImagePresentation";
import ImageContentPresentation, { ImageContentPresentationItem } from "../../components/ImageContentPresentation";
import ImagePresentation, { ImagePresentationItem } from "../../components/ImagePresentation";

type props = {
    quizItem: QuizItem;
    userRole?: string;
    serverHandler: IQuizInteractionHandler;
}
const QuizComponentSelector = ({ quizItem, userRole, serverHandler }: props) => {
    switch (quizItem.type) {
        case QuizItemsTypes.QUIZSTART:
            return <QuizStart />;
        case QuizItemsTypes.TitlePresentation:
            return (
                <Presentation>
                    <TitlePresentation title={(quizItem.item as TitlePresentationItem).title} />
                </Presentation>
            );
        case QuizItemsTypes.TitleImagePresentation:
            return (
                <Presentation>
                    <TitleImagePresentation
                        title={(quizItem.item as TitleImagePresentationItem).title}
                        image={(quizItem.item as TitleImagePresentationItem).image}
                    />
                </Presentation>
            );
        case QuizItemsTypes.ImageContentPresentation:
            return (
                <Presentation>
                    <ImageContentPresentation
                        image={(quizItem.item as ImageContentPresentationItem).image}
                        content={(quizItem.item as ImageContentPresentationItem).content}
                    />
                </Presentation>
            );
        case QuizItemsTypes.ImagePresentation:
            return (
                <Presentation>
                    <ImagePresentation image={(quizItem.item as ImagePresentationItem).image} />
                </Presentation>
            );
        case QuizItemsTypes.SingleAnswer:
        case QuizItemsTypes.MultipleAnswer:
            return(
                <>
                    {userRole === 'admin' ? (
                        <MultipleOptionResults
                            question={quizItem.item as MultipleOptionQuestion}
                            quizInteractionHandler={serverHandler}
                        />

                    ): (
                        <>
                            {quizItem.type === QuizItemsTypes.SingleAnswer && (
                                <SingleAnswer
                                    question={quizItem.item as MultipleOptionQuestion}
                                    quizInteractionHandler={serverHandler}
                                />
                            )}
                            {quizItem.type === QuizItemsTypes.MultipleAnswer && (
                                <MultipleAnswer
                                    question={quizItem.item as MultipleOptionQuestion}
                                    quizInteractionHandler={serverHandler}
                                />
                            )}
                        </>
                    )}
                </>
            );
        default:
            return <h1>Nothing Here 👀</h1>;
    }
};

export default QuizComponentSelector;

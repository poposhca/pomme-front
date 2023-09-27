import QuizItemsTypes from "../../models/QuizItemsTypes.ts";
import QuizItem from "../../models/QuizItem.ts";
import IQuizInteractionHandler from "../../models/IQuizInteractionHandler.ts";
import QuizStart from "../../components/QuizStart";
import Presentation from "../Presentation";
import MultipleOptionResults from "../../components/MultipleOptionResults";
import MultipleOptionQuestion from "../../models/MultipleOptionQuestion.ts";
import SingleAnswer from "../../components/SingleAnswer";
import MultipleAnswer from "../../components/MultipleAnswer";
import TitlePresentation from "../../components/TitlePresentation";
import TitlePresentationItem from "../../models/TitlePresentationItem.ts";

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
            // eslint-disable-next-line no-case-declarations
            const item = quizItem.item as TitlePresentationItem
            return (
                <Presentation>
                    <TitlePresentation title={item.title} />
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

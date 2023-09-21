import { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import { useUserProfile } from '../../hooks/useUserProfile.ts';
import quizIterator from "../../utils/QuizIterator.ts";
import QuizItemsTypes from "../../models/QuizItemsTypes.ts";
import QuizItem from "../../models/QuizItem.ts";
import IQuizIterator from "../../models/IQuizIterator.ts";
import MultipleOptionQuestion from "../../models/MultipleOptionQuestion.ts";
import handlers from "../../handlers";
import SingleAnswer from "../SingleAnswer";
import MultipleAnswer from "../MultipleAnswer";
import Presentation from "../Presentation";
import MultipleOptionResults from "../MultipleOptionResults";
import QuizStart from "../QuizStart";

const Quiz = () => {
    const [quiz, setQuiz] = useState(
        {
            getCurrent: () => 0,
            getLength: () => 0,
            currentQuestion: () => ({ type: 'empty' })
        } as IQuizIterator);
    const [question, setQuestion] = useState({} as QuizItem);
    const [quizAdminId, setQuizAdminId] = useState('');
    const user = useUserProfile();
    // TODO: remove any
    const [serverHandler, setServerHandler] = useState({} as any);

    const setNextQuestion = () => {
        const nextQuestion = quiz.next();
        setQuestion(nextQuestion);
        serverHandler.setQuizPosition(quiz.getCurrent());
    };

    const setPreviewsQuestion = () => {
        const prevQuestion = quiz.previous();
        setQuestion(prevQuestion);
        serverHandler.setQuizPosition(quiz.getCurrent());
    }

    const getQuizPosition = (position: number) => {
        const actualQuestion = quiz.goTo(position);
        setQuestion(actualQuestion);
    }

    useEffect(() => {
        // Get quiz from server
        const newQuiz = handlers.questionHandler.getQuiz();
        const newIterator = quizIterator(newQuiz);
        setQuiz(newIterator);
        setQuestion(newIterator.currentQuestion());
        setQuizAdminId(handlers.questionHandler.getQuizAdminId());
    }, []);

    // Connect to server when user is defined
    useEffect(() => {
        if(user) {
            // TODO: Un-hardcode Quiz ID to implement different quizzes
            const newServerHandler = handlers.quizInteractionHandler({
                userId: user?.id || '000',
                quizId: '01',
            });
            newServerHandler.joinQuiz(quizAdminId);
            newServerHandler.setGetQuizPositionEvent(getQuizPosition)
            setServerHandler(newServerHandler);
        }
    }, [user]);

    console.log(user);

    // Select body to render
    let BodyComponent = <h1>Nothing Here 👀</h1>;
    switch (question.type) {
        case QuizItemsTypes.QUIZSTART:
            BodyComponent = (<QuizStart />);
            break;
        case QuizItemsTypes.Presentation:
            BodyComponent = (
                <Presentation />
            );
            break;
        case QuizItemsTypes.SingleAnswer:
        case QuizItemsTypes.MultipleAnswer:
            BodyComponent = (
                <>
                    {user?.role === 'admin' ? (
                        <MultipleOptionResults
                            question={question.item as MultipleOptionQuestion}
                            quizInteractionHandler={serverHandler}
                        />

                    ): (
                        <>
                            {question.type === QuizItemsTypes.SingleAnswer && (
                                <SingleAnswer
                                    question={question.item as MultipleOptionQuestion}
                                    quizInteractionHandler={serverHandler}
                                />
                            )}
                            {question.type === QuizItemsTypes.MultipleAnswer && (
                                <MultipleAnswer
                                    question={question.item as MultipleOptionQuestion}
                                    quizInteractionHandler={serverHandler}
                                />
                            )}
                        </>
                    )}
                </>
            );
            break;
    }

    return (
        <>
            {BodyComponent}
            {user?.role === 'admin' && (
                <>
                    {quiz.getCurrent() !== 0 && (
                        <Button variant="outlined" onClick={setPreviewsQuestion}>Back</Button>
                    )}
                    {quiz.getCurrent() !== quiz.getLength() - 1 && (
                        <Button variant="outlined" onClick={setNextQuestion}>Next</Button>
                    )}
                </>
            )}
        </>
    );


};

export default Quiz;

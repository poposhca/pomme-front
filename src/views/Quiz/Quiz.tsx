import { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import QuizComponentSelector from "./QuizComponentSelector.tsx";
import { useUserProfile } from '../../hooks/useUserProfile.ts';
import quizIterator from "../../utils/QuizIterator.ts";
import QuizItem from "../../models/QuizItem.ts";
import IQuizIterator from "../../models/IQuizIterator.ts";
import IQuizInteractionHandler from "../../models/IQuizInteractionHandler.ts";
import handlers from "../../handlers";
import { Props } from "./types.ts";

const Quiz = ({ quizId }: Props) => {
    const [quiz, setQuiz] = useState(
        {
            getCurrent: () => 0,
            getLength: () => 0,
            currentQuestion: () => ({ type: 'empty' })
        } as IQuizIterator);
    const [question, setQuestion] = useState({} as QuizItem);
    const [quizAdminId, setQuizAdminId] = useState('');
    const user = useUserProfile();
    const [serverHandler, setServerHandler] = useState({} as IQuizInteractionHandler);

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
        handlers.questionHandler.getQuiz({ quizId }).then((newQuiz) => {
            const newIterator = quizIterator(newQuiz);
            setQuiz(newIterator);
            setQuestion(newIterator.currentQuestion());
        });
        handlers.questionHandler.getQuizAdminId({ quizId }).then((newQuizAdminId) => {
            console.log(newQuizAdminId);
            setQuizAdminId(newQuizAdminId);
        });
    }, []);

    // Connect to server when user is defined
    useEffect(() => {
        if(user) {
            const newServerHandler = handlers.quizInteractionHandler({
                userId: user?.id || '000',
                quizId,
            });
            newServerHandler.joinQuiz(quizAdminId);
            newServerHandler.setGetQuizPositionEvent(getQuizPosition)
            setServerHandler(newServerHandler);
        }
    }, [user]);

    return (
        <>
            <QuizComponentSelector quizItem={question} userRole={user?.role} serverHandler={serverHandler} />
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

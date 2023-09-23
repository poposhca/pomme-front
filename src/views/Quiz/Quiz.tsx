import { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import QuizComponentSelector from "./QuizComponentSelector.tsx";
import { useUserProfile } from '../../hooks/useUserProfile.ts';
import quizIterator from "../../utils/QuizIterator.ts";
import QuizItem from "../../models/QuizItem.ts";
import IQuizIterator from "../../models/IQuizIterator.ts";
import handlers from "../../handlers";

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

import { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { useParams } from "react-router-dom";
import QuizComponentSelector from "./QuizComponentSelector.tsx";
import { useUserProfile } from '../../hooks/useUserProfile.ts';
import quizIterator from "../../utils/QuizIterator.ts";
import QuizItem from "../../models/QuizItem.ts";
import IQuizIterator from "../../models/IQuizIterator.ts";
import IQuizInteractionHandler from "../../models/IQuizInteractionHandler.ts";
import handlers from "../../handlers";

const defaultQuiz = {
    getCurrent: () => 0,
    getLength: () => 0,
    currentQuestion: () => ({ type: 'empty' })
} as IQuizIterator;

const Quiz = () => {
    const { quizId } = useParams<{ quizId: string }>();
    const [quiz, setQuiz] = useState(defaultQuiz);
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
        if(quizId === undefined) return;
        console.log(quizId);
        handlers.questionHandler.getQuiz({ quizId }).then((newQuiz) => {
            console.log(newQuiz);
            const newIterator = quizIterator(newQuiz);
            setQuiz(newIterator);
            setQuestion(newIterator.currentQuestion());
        });
        handlers.questionHandler.getQuizAdminId({ quizId }).then((newQuizAdminId) => {
            setQuizAdminId(newQuizAdminId);
        });
    }, [quizId]);

    // Connect to server when user is defined
    useEffect(() => {
        if(quizId === undefined) return;
        if(user) {
            const newServerHandler = handlers.quizInteractionHandler({
                userId: user?.id || '000',
                quizId,
            });
            newServerHandler.joinQuiz(quizAdminId);
            newServerHandler.setGetQuizPositionEvent(getQuizPosition)
            setServerHandler(newServerHandler);
        }
    }, [user, quizId]);

    return (
        <Grid
            container
            direction="column"
            spacing={3}
            justifyContent="space-between"
        >
            <Grid item xs={12}>
                <QuizComponentSelector quizItem={question} userRole={user?.role} serverHandler={serverHandler} />
            </Grid>
            <Grid item xs={12}>
                {user?.role === 'admin' && (
                    <Grid container justifyContent={"space-between"}>
                        <Grid item md={1}>
                            {quiz.getCurrent() !== 0 && (
                                <Button variant="outlined" onClick={setPreviewsQuestion}>Back</Button>
                            )}
                        </Grid>
                        <Grid item md={1}>
                            {quiz.getCurrent() !== quiz.getLength() - 1 && (
                                <Button variant="outlined" onClick={setNextQuestion}>Next</Button>
                            )}
                        </Grid>
                    </Grid>
                )}
            </Grid>
        </Grid>
    );


};

export default Quiz;

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

const Quiz = () => {
    const { quizId } = useParams<{ quizId: string }>();
    const [quiz, setQuiz] = useState(undefined as IQuizIterator | undefined);
    const [question, setQuestion] = useState(undefined as QuizItem | undefined);
    const user = useUserProfile();
    const [serverHandler, setServerHandler] = useState(undefined as IQuizInteractionHandler | undefined);

    const setNextQuestion = () => {
        const nextQuestion = quiz?.next();
        setQuestion(nextQuestion);
        serverHandler?.setQuizPosition(quiz?.getCurrent());
    };

    const setPreviewsQuestion = () => {
        const prevQuestion = quiz?.previous();
        setQuestion(prevQuestion);
        serverHandler?.setQuizPosition(quiz?.getCurrent());
    }

    useEffect(() => {
        if (user && quizId) {
            handlers.questionHandler.getQuiz({quizId}).then((newQuiz) => {
                const newIterator = quizIterator(newQuiz);
                setQuiz(newIterator);
            });
        }
    }, [user, quizId]);

    useEffect(() => {
        const getQuizPosition = (position: number) => {
            const actualQuestion = quiz?.goTo(position);
            setQuestion(actualQuestion);
        }
        if (user && quiz) {
            const newQuizAdminId = handlers.questionHandler.getQuizAdminId();
            const newServerHandler = handlers.quizInteractionHandler({
                userId: user?.id,
                quizId: quizId as string,
            });
            newServerHandler.joinQuiz(newQuizAdminId);
            newServerHandler.setGetQuizPositionEvent(getQuizPosition);
            setServerHandler(newServerHandler);
        }
    }, [quiz, quizId, user]);

    useEffect(() => () => {
        console.log('unmount');
    }, []);

    return (
        <Grid
            container
            direction="column"
            spacing={3}
            justifyContent="space-between"
        >
            {quiz && question && serverHandler ? (
            <>
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
            </>
            ): (
                <Grid item xs={12}>
                    Loading...
                </Grid>
            )}
        </Grid>
    );


};

export default Quiz;

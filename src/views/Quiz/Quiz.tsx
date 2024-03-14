import { useState, useEffect } from "react";
import Grid from '@mui/material/Grid';
import { useParams } from "react-router-dom";
import QuizComponentSelector from "./QuizComponentSelector.tsx";
import QuizController from "../../components/QuizConteroller";
import { useUserProfile } from '../../hooks/useUserProfile.ts';
import quizIterator from "../../utils/QuizBlockIterator.ts";
import QuizItem from "../../models/QuizItem.ts";
import IQuizIterator from "../../models/IQuizIterator.ts";
import IQuizInteractionHandler from "../../models/IQuizInteractionHandler.ts";
import handlers from "../../handlers";
import Box from "@mui/material/Box";

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

    const setRetryQuestion = () => {
        const retryQuestion = quiz?.resetBlock();
        setQuestion(retryQuestion);
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
        if(serverHandler) {
            console.log('exiting quiz');
            serverHandler.exitQuiz();
        } else {
            console.log('no server handler');
        }
    }, [serverHandler]);

    return (
        <Grid
            container
            direction="column"
            spacing={3}
            justifyContent="space-between"
        >
            {quiz && question && serverHandler ? (
            <>
                <Grid item xs={6}>
                    <Box
                        sx={{
                            height: '80vh',
                        }}
                    >
                        <QuizComponentSelector quizItem={question} userRole={user?.role} serverHandler={serverHandler} />
                    </Box>
                </Grid>
                <Grid item xs={6}>
                    <Box
                        sx={{
                            height: '10vh',
                        }}
                    >
                    {user?.role === 'admin' && (
                        <QuizController
                            currentPosition={quiz.getCurrent()}
                            quizLength={quiz.getLength()}
                            setPreviewsQuestion={setPreviewsQuestion}
                            setNextQuestion={setNextQuestion}
                            setRetry={setRetryQuestion}
                        />
                    )}
                    </Box>
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

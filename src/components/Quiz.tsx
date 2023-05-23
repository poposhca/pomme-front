import { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import quizIterator from "../utils/QuizIterator.ts";
import QuizItemsTypes from "../models/QuizItemsTypes.ts";
import QuizItem from "../models/QuizItem.ts";
import IQuizIterator from "../models/IQuizIterator.ts";
import handlers from "../handlers";
import SingleAnswer from "./SingleAnswer.tsx";

const Quiz = () => {
    const [quiz, setQuiz] = useState({currentQuestion: () => ({ type: 'empty' })} as IQuizIterator);
    const [question, setQuestion] = useState({} as QuizItem);

    useEffect(() => {
        const newQuiz = handlers.questionHandler.getQuiz();
        const newIterator = quizIterator(newQuiz)
        setQuiz(newIterator);
        setQuestion(newIterator.currentQuestion());
    }, []);

    const setNextQuestion = () => {
        const nextQuestion = quiz.next();
        setQuestion(nextQuestion);
    };

    const setPreviewsQuestion = () => {
        const prevQuestion = quiz.previous();
        setQuestion(prevQuestion);
    }

    return (
        <>
            {question.type === QuizItemsTypes.SingleAnswer && (
                <SingleAnswer question={question.item} />
            )}
            {question.type === QuizItemsTypes.MultipleAnswer && (
                <h1>To implement</h1>
            )}
            <Button variant="outlined" onClick={setPreviewsQuestion}>Back</Button>
            <Button variant="outlined" onClick={setNextQuestion}>Next</Button>
        </>
    );
};

export default Quiz;

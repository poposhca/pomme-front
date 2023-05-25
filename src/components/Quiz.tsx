import { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import quizIterator from "../utils/QuizIterator.ts";
// import QuizItemsTypes from "../models/QuizItemsTypes.ts";
import QuizItem from "../models/QuizItem.ts";
import IQuizIterator from "../models/IQuizIterator.ts";
import handlers from "../handlers";
// import SingleAnswer from "./User/SingleAnswer.tsx";
// import MultipleAnswer from "./User/MultipleAnswer.tsx";
import MultipleOptionResults from "./Admin/MultipleOptionResults.tsx";

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
            {/* TODO: Implement rol difference */}
            {/*{question.type === QuizItemsTypes.SingleAnswer && (
                <SingleAnswer question={question.item} />
            )}
            {question.type === QuizItemsTypes.MultipleAnswer && (
                <MultipleAnswer question={question.item} />
            )}*/}
            <MultipleOptionResults question={question.item} />
            <Button variant="outlined" onClick={setPreviewsQuestion}>Back</Button>
            <Button variant="outlined" onClick={setNextQuestion}>Next</Button>
        </>
    );
};

export default Quiz;

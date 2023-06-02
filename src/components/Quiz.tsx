import { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import {useAuth0} from "@auth0/auth0-react";
import quizIterator from "../utils/QuizIterator.ts";
import QuizItemsTypes from "../models/QuizItemsTypes.ts";
import QuizItem from "../models/QuizItem.ts";
import IQuizIterator from "../models/IQuizIterator.ts";
import MultipleOptionQuestion from "../models/MultipleOptionQuestion.ts";
import PresentationSlide from "../models/PresentationSlide.ts";
import handlers from "../handlers";
import SingleAnswer from "./User/SingleAnswer.tsx";
import MultipleAnswer from "./User/MultipleAnswer.tsx";
import Presentation from "./Presentation.tsx";
import MultipleOptionResults from "./Admin/MultipleOptionResults.tsx";
import QuizStart from "./User/QuizStart.tsx";

const Quiz = () => {
    const [quiz, setQuiz] = useState({currentQuestion: () => ({ type: 'empty' })} as IQuizIterator);
    const [question, setQuestion] = useState({} as QuizItem);
    const { user } = useAuth0();

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

    // Select body to render
    let BodyComponent = <h1>Nothing Here 👀</h1>;
    switch (question.type) {
        case QuizItemsTypes.QUIZSTART:
            BodyComponent = (<QuizStart />);
            break;
        case QuizItemsTypes.Presentation:
            BodyComponent = (
                <Presentation presentationItem={question.item as PresentationSlide} />
            );
            break;
        case QuizItemsTypes.SingleAnswer:
        case QuizItemsTypes.MultipleAnswer:
            BodyComponent = (
                <>
                    {user?.role === 'admin' ? (
                        <MultipleOptionResults question={question.item as MultipleOptionQuestion} />
                    ): (
                        <>
                            {question.type === QuizItemsTypes.SingleAnswer && (
                                <SingleAnswer question={question.item as MultipleOptionQuestion} />
                            )}
                            {question.type === QuizItemsTypes.MultipleAnswer && (
                                <MultipleAnswer question={question.item as MultipleOptionQuestion} />
                            )}
                        </>
                    )}
                </>
            );
            break;
    }

    // Render
    return (
        <>
            {BodyComponent}
            <Button variant="outlined" onClick={setPreviewsQuestion}>Back</Button>
            <Button variant="outlined" onClick={setNextQuestion}>Next</Button>
        </>
    );


};

export default Quiz;

import IGetQuizData from "../models/IGetQuizData.ts";
import MultipleOptionQuestion from "../models/MultipleOptionQuestion.ts";
import QuizItems from "../models/QuizItem.ts";
import questions from '../../mockData/question.json';

const mockQuestionHandler: IGetQuizData = {
    getQuestion(): MultipleOptionQuestion {
        return questions[1].item as MultipleOptionQuestion;
    },
    getQuiz(): QuizItems[] {
        return questions;
    }
}

export default mockQuestionHandler;

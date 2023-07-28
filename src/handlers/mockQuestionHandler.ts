import IGetQuizData from "../models/IGetQuizData.ts";
import MultipleOptionQuestion from "../models/MultipleOptionQuestion.ts";
import questions from '../../mockData/salid.json';
import QuizItems from "../models/QuizItem.ts";

const mockQuestionHandler: IGetQuizData = {
    getQuestion(): MultipleOptionQuestion {
        return questions[1].item as MultipleOptionQuestion;
    },
    getQuiz(): QuizItems[] {
        return questions as QuizItems[];
    },
    getQuizAdminId(): string {
        return 'auth0|6478d91e194ae5b5f16987d3';
    }
}

export default mockQuestionHandler;

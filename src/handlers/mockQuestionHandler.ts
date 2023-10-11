import IGetQuizData from "../models/IGetQuizData.ts";
import questions from '../../mockData/mockQuiz.json';
import QuizItems from "../models/QuizItem.ts";

const mockQuestionHandler: IGetQuizData = {
    getQuiz(): QuizItems[] {
        return questions as QuizItems[];
    },
    getQuizAdminId(): string {
        return 'auth0|6478d91e194ae5b5f16987d3';
    }
}

export default mockQuestionHandler;

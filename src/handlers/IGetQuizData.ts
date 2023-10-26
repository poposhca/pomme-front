import { QuizItem, QuizInfo } from "../models/index.ts";

type InputParameters = {
    quizId: string;
};
interface IGetQuizData {
    getQuizzesList: () => Promise<QuizInfo[]>;
    getQuiz: ({ quizId }: InputParameters) => Promise<QuizItem[]>;
    getQuizAdminId: ({ quizId }: InputParameters) => Promise<string>;
}

export default IGetQuizData;

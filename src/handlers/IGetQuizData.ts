import QuizItems from "../models/QuizItem.ts";

type InputParameters = {
    quizId: string;
};
interface IGetQuizData {
    getQuiz: ({ quizId }: InputParameters) => Promise<QuizItems[]>;
    getQuizAdminId: ({ quizId }: InputParameters) => Promise<string>;
}

export default IGetQuizData;

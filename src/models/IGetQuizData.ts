import QuizItems from "./QuizItem.ts";
interface IGetQuizData {
    getQuiz: () => Promise<QuizItems[]>;
    getQuizAdminId: () => Promise<string>;
}

export default IGetQuizData;

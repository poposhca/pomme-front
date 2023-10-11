import QuizItems from "./QuizItem.ts";
interface IGetQuizData {
    getQuiz: () => QuizItems[];
    getQuizAdminId: () => string;
}

export default IGetQuizData;

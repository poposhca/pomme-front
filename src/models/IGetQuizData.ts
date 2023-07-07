import MultipleOptionQuestion from "./MultipleOptionQuestion.ts";
import QuizItems from "./QuizItem.ts";
interface IGetQuizData {
    getQuestion: () => MultipleOptionQuestion;
    getQuiz: () => QuizItems[];
    getQuizAdminId: () => string;
}

export default IGetQuizData;

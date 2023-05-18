import IGetQuizData from "../models/IGetQuizData.ts";
import MultipleOptionQuestion from "../models/MultipleOptionQuestion.ts";
import question from '../../mockData/question.json';

const mockQuestionHandler: IGetQuizData = {
    getQuestion(): MultipleOptionQuestion {
        return question as MultipleOptionQuestion;
    }
}

export default mockQuestionHandler;

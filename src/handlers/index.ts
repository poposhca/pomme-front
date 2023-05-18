import mockQuestionHandler from "./mockQuestionHandler.ts";
import IGetQuizData from "../models/IGetQuizData.ts";

interface IHandlers {
    questionHandler: IGetQuizData;
}

const handlers: IHandlers = {
   questionHandler: mockQuestionHandler,
};

export default handlers;

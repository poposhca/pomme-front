import mockQuestionHandler from "./mockQuestionHandler.ts";
import IGetQuizData from "../models/IGetQuizData.ts";
import IQuizInteractionHandler from "../models/IQuizInteractionHandler.ts";

interface IHandlers {
    questionHandler: IGetQuizData;
    quizInteractionHandler: IQuizInteractionHandler;
}

const handlers: IHandlers = {
   questionHandler: mockQuestionHandler,
    quizInteractionHandler: {},
};

export default handlers;

import mockQuestionHandler from "./mockQuestionHandler.ts";
import IGetQuizData from "../models/IGetQuizData.ts";
import IQuizInteractionHandler, {IQuizInteractionHandlerParameters} from "../models/IQuizInteractionHandler.ts";
import socketIOQuizInteractionHandler from "./socketIOQuizInteractionHandler.ts";

interface IHandlers {
    questionHandler: IGetQuizData;
    quizInteractionHandler: ({userId, quizId}:IQuizInteractionHandlerParameters ) => IQuizInteractionHandler;
}

const handlers: IHandlers = {
    questionHandler: mockQuestionHandler,
    quizInteractionHandler: socketIOQuizInteractionHandler,
};

export default handlers;

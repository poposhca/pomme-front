import gqlQuestionHandler from "./gqlQuestionHandler/index.ts";
import IGetQuizData from "./IGetQuizData.ts";
import IQuizInteractionHandler, {IQuizInteractionHandlerParameters} from "../models/IQuizInteractionHandler.ts";
import socketIOQuizInteractionHandler from "./socketIOQuizInteractionHandler.ts";

interface IHandlers {
    questionHandler: IGetQuizData;
    quizInteractionHandler: ({userId, quizId}:IQuizInteractionHandlerParameters ) => IQuizInteractionHandler;
}

const handlers: IHandlers = {
    questionHandler: gqlQuestionHandler(),
    quizInteractionHandler: socketIOQuizInteractionHandler,
};

export default handlers;

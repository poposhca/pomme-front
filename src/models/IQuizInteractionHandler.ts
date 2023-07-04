import { ReceiveAnswerMessage } from "../models/Messages.ts";

interface IQuizInteractionHandler {
    joinQuiz: (adminId: string) => void;
    sendAnswer: (answers: number[], adminId: string) => void;
    receiveAnswer: (eventFunc: (answer: ReceiveAnswerMessage) => void) => void;
    setGetQuizPositionEvent: (eventFunc: (position: number) => void) => void;
    setQuizPosition: (position: number) => void;
}

export type IQuizInteractionHandlerParameters = {
    userId: string;
    quizId: string;
}

export default IQuizInteractionHandler;

interface IQuizInteractionHandler {
    joinQuiz: (adminId: string) => void;
    sendAnswer: (answer: string) => void;
    receiveAnswer: (eventFunc: (answer: number) => void) => void;
    setGetQuizPositionEvent: (eventFunc: (position: number) => void) => void;
    setQuizPosition: (position: number) => void;
}

export type IQuizInteractionHandlerParameters = {
    userId: string;
    quizId: string;
}

export default IQuizInteractionHandler;

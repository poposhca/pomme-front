interface IQuizInteractionHandler {
    connectToServer: () => void;
    sendAnswer: (answer: string) => void;
    getQuizPosition: () => number;
}

export default IQuizInteractionHandler;

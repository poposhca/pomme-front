export type ReceiveAnswerMessage = {
    userId: string;
    // TODO: Refactor to accept more types of answers
    answers: number[];
};

export type SendAnswersMessage = {
    quizId: string;
    adminId: string;
    // TODO: Refactor to accept more types of answers
    answers: number[];
};

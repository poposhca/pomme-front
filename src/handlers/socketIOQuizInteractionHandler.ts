import { io } from 'socket.io-client';
import IQuizInteractionHandler, { IQuizInteractionHandlerParameters } from "../models/IQuizInteractionHandler.ts";
import { ReceiveAnswerMessage, SendAnswersMessage } from "../models/Messages.ts";
import QuizHandlerEvents from "../models/QuizHandlerEvents.ts";
import { QUIZ_HANDLER_URL } from "../config.ts";

const socketIOQuizInteractionHandler = ({userId, quizId}: IQuizInteractionHandlerParameters) => {
    const socket = io(QUIZ_HANDLER_URL, {
        extraHeaders: {
            Authorization: userId
        }
    });

    socket.on(QuizHandlerEvents.connection, () => {
        console.log("connected to pomme server");
    });

    return {
        joinQuiz: (adminId: string) => {
            socket.emit(QuizHandlerEvents.joinQuiz, {
                quizId,
                adminId,
            });
        },
        sendAnswer: (answers: number[], adminId: string) => {
            const message: SendAnswersMessage = {
                quizId,
                adminId,
                answers,
            };
            socket.emit(QuizHandlerEvents.sendAnswers, message);
        },
        receiveAnswer: (eventFunc: (answer: ReceiveAnswerMessage) => void) => {
            socket.on(QuizHandlerEvents.receiveAnswer, (answer: ReceiveAnswerMessage) => {
                eventFunc(answer);
            });
        },
        setGetQuizPositionEvent: (eventFunc: (position: number) => void) => {
            socket.on(QuizHandlerEvents.sendQuizPosition, (newPosition: string) => {
                eventFunc(Number(newPosition));
            });
        },
        setQuizPosition: (position: number) => {
            socket.emit(QuizHandlerEvents.setQuizPosition, {
                quizId,
                position,
            })
        },
        exitQuiz: () => {
            socket.disconnect();
        }
    } as IQuizInteractionHandler;
}

export default socketIOQuizInteractionHandler;

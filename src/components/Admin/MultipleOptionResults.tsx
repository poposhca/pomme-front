import { useState, useEffect } from "react";
import { VictoryBar, VictoryChart } from "victory";
import MultipleOptionQuestion from "../../models/MultipleOptionQuestion.ts";
import IQuizInteractionHandler from "../../models/IQuizInteractionHandler.ts";
import { ReceiveAnswerMessage } from "../../models/Messages.ts";

interface Props {
    question: MultipleOptionQuestion;
    quizInteractionHandler: IQuizInteractionHandler;
}

 const MultipleOptionResults = ({ question, quizInteractionHandler }: Props) => {
    const [answersStatistics, setAnswersStatistics] = useState([] as any[]);
    const [answersMessages, setAnswersMessages] = useState([] as ReceiveAnswerMessage[]);

    const pushNewMessage = (message: ReceiveAnswerMessage) => {
        setAnswersMessages((messages) => [...messages, message]);
    };

    useEffect(() => {
        quizInteractionHandler.receiveAnswer(pushNewMessage);
    }, []);

    useEffect(() => {
        if (question === undefined) return;
        const newAnswersStatistics = question.options?.map((_, index) => {
            return {
                label: index,
                count: 0,
            };
        });
        setAnswersStatistics(newAnswersStatistics);
        setAnswersMessages([] as ReceiveAnswerMessage[]);
    }, [question]);

    useEffect(() => {
        if (question === undefined) return;
        const newAnswersStatistics = question.options?.map((_, index) => {
            return {
                label: index,
                count: 0,
            };
        });
        answersMessages.forEach((message) => {
            message.answers.forEach((answerIndex) => {
                (newAnswersStatistics[answerIndex]).count++;
            });
        });
        setAnswersStatistics(newAnswersStatistics);
    }, [answersMessages]);

    // console.log(answersStatistics);
    // console.log(answersMessages);
     return (
         <>
             {answersStatistics ? (
                 <>
                     <h1>{question.label}</h1>
                     <VictoryChart domainPadding={30}>
                         <VictoryBar data={answersStatistics} x="label" y="count" />
                     </VictoryChart>
                 </>
             ): (
                 <h1>LOADING</h1>
             )}
         </>
     );
 };

export default MultipleOptionResults;

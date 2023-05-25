import { useState, useEffect } from "react";
import { VictoryBar, VictoryChart } from "victory";
import MultipleOptionQuestion from "../../models/MultipleOptionQuestion.ts";

interface Props {
    question: MultipleOptionQuestion;
}

 const MultipleOptionResults = ({ question }: Props) => {
    const [answers, setAnswers] = useState(undefined);

    useEffect(() => {
        const answers = question?.options?.map((option) => {
            return {
                label: option.label,
                count: 3,
            };
        });
        setAnswers(answers as any);
    }, [question]);

     return (
         <>
             {answers ? (
                 <VictoryChart domainPadding={30}>
                     <VictoryBar data={answers} x="label" y="count" />
                 </VictoryChart>
             ): (
                 <h1>LOADING</h1>
             )}
         </>
     );
 };

export default MultipleOptionResults;

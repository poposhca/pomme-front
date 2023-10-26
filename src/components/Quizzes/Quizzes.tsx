import { useState, useEffect } from "react";
import { Props } from "./types.ts";

const Quizzes = ({ handlers }: Props) => {
    const [quizInfoList, setQuizInfoList] = useState([]);

    useEffect(() => {
        handlers.questionHandler.getQuizzesList().then((res) => {
            // TODO - remove any
            setQuizInfoList(res as any);
        });
    }, []);

    return (
        <div className="quizzes">
            <h1>Quizzes</h1>
            <ul>
                {quizInfoList.map((quizInfo: any) => (
                    <h2>{quizInfo.name}</h2>
                ))}
            </ul>
        </div>
    );
};

export default Quizzes;

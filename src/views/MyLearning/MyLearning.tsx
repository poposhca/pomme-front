import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Box from "@mui/material/Box";
import QuizInfoCard from "../../components/QuizInfoCard";
import IGetQuizData from "../../handlers/IGetQuizData.ts";
import {QuizInfo} from "../../models";
import "./styles.css";


const MyLearning = ({ getQuizDataHandler }: {getQuizDataHandler: IGetQuizData}) => {
    const [quizzesInfo, setQuizzesInfo] = useState([] as QuizInfo[]);

    useEffect(() => {
        getQuizDataHandler.getQuizzesList().then(result => {
            setQuizzesInfo(result);
        });
    }, []);

    return (
        <Box className="quizzesBox">
            <Grid container spacing={2}>
                {quizzesInfo.length > 0 ?  quizzesInfo.map((quizInfo, i) => (
                    <Grid item xs={4} key={i}>
                        <QuizInfoCard quizId={quizInfo.id} quizName={quizInfo.name} quizImageUrl={quizInfo.image || ""} />
                    </Grid>
                ))
                : <h1>No Quizzes Found</h1>
                }
            </Grid>
        </Box>
    )
};

export default MyLearning;

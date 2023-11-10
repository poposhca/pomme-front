import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Box from "@mui/material/Box";
import QuizInfoCard from "../../components/QuizInfoCard";
import "./styles.css";

const MyLearning = () => {
    const [quizzesInfo, setQuizzesInfo] = useState([{}]);

    useEffect(() => {
        setQuizzesInfo([{}, {}, {}, {}, {}, {}]);
    }, []);

    return (
        <Box className="quizzesBox">
            <Grid container spacing={2}>
                {quizzesInfo.map(() => (
                    <Grid item xs={4}>
                        <QuizInfoCard quizId="01" quizName="Perro" />
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
};

export default MyLearning;

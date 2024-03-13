import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

type Props = {
    currentPosition: number;
    quizLength: number;
    setPreviewsQuestion: () => void;
    setNextQuestion: () => void;
}

const QuizController = ({
    currentPosition,
    quizLength,
    setPreviewsQuestion,
    setNextQuestion
}: Props) => {
    return (
        <Grid container justifyContent={"space-between"}>
            <Grid item md={1}>
                {currentPosition !== 0 && (
                    <Button variant="outlined" onClick={setPreviewsQuestion}>Back</Button>
                )}
            </Grid>
            <Grid item md={1}>
                <Button variant="outlined">Retry</Button>
            </Grid>
            <Grid item md={1}>
                {currentPosition !== quizLength - 1 && (
                    <Button variant="outlined" onClick={setNextQuestion}>Next</Button>
                )}
            </Grid>
        </Grid>
    );
};

export default QuizController;

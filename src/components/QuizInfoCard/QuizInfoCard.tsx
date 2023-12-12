import { Props } from "./types.ts";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import { Link } from "react-router-dom";

const QuizInfoCard = ({ quizId, quizName, quizImageUrl }: Props) => {
    return (
        <Card>
            <CardMedia
                sx={{ height: 140 }}
                image={quizImageUrl}
                title={`${quizName} cover`}
            />
            <CardContent>
                <Typography variant="h3">
                    {quizName}
                </Typography>
            </CardContent>
            <CardActions>
                <Link to={`/quiz/${quizId}`}>
                    <Button size="small">Join Quiz</Button>
                </Link>
            </CardActions>
        </Card>
    );
};

export default QuizInfoCard;

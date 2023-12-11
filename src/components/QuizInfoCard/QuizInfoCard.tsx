import { Props } from "./types.ts";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";

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
                <Button size="small">Join {quizId}</Button>
            </CardActions>
        </Card>
    );
};

export default QuizInfoCard;

import { useState } from "react";
import Box from '@mui/material/Box';
import { Button } from "@mui/material";
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';
import MultipleOptionQuestion from "../../models/MultipleOptionQuestion.ts";
import IQuizInteractionHandler from "../../models/IQuizInteractionHandler.ts";

interface Props {
    question: MultipleOptionQuestion;
    quizInteractionHandler: IQuizInteractionHandler;
}

interface Answers {
    [key: string]: boolean;
}

const MultipleAnswer = ({ question, quizInteractionHandler }: Props) => {
    const [answers, setAnswers] = useState(
        question.options.reduce((current, option) => ({ ...current, [option.label]: false } as Answers), {} as Answers)
    );
    const [helperText, setHelperText] = useState('Choose wisely');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(`EVENT: ${event.target.name} ${event.target.checked}`);
        setAnswers({
            ...answers,
            [event.target.name]: event.target.checked
        });
    }

    const handleSubmit = () => {
        let index = 0;
        const message: number[] = [];
        for (const key in answers) {
            if (answers[key]) {
                message.push(index);
            }
            index++;
        }
        quizInteractionHandler.sendAnswer(message, '123');
        const result = question.options.every((option) => option.isCorrectAnswer === answers[option.label]);
        if (result) {
            setHelperText('You got it!');
        } else {
            setHelperText('Sorry, wrong answer!');
        }
    };

    return(
        <Box sx={{ display: 'flex' }}>
            <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
                <FormLabel component="legend">{question.label}</FormLabel>
                <FormGroup>
                {question.options.map((option, index) => (
                    <FormControlLabel
                        key={index}
                        control={
                            <Checkbox checked={answers[option.label]} onChange={handleChange} name={option.label} />
                        }
                        label={option.label}
                    />
                ))}
                </FormGroup>
                <FormHelperText>{helperText}</FormHelperText>
                <Button variant="outlined" onClick={handleSubmit}>
                    Check Answer
                </Button>
            </FormControl>
        </Box>
    );
}

export default MultipleAnswer;

import { useState, ChangeEvent } from "react";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import MultipleOptionQuestion from "../../models/MultipleOptionQuestion.ts";
import IQuizInteractionHandler from "../../models/IQuizInteractionHandler.ts"

type Props = {
    question: MultipleOptionQuestion;
    quizInteractionHandler: IQuizInteractionHandler;
}

const SingleAnswer = ({ question, quizInteractionHandler }: Props) => {
    const [answer, setAnswer] = useState(0);
    const [helperText, setHelperText] = useState('Choose wisely');

    const handleRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newAnswer = Number((event.target as HTMLInputElement).value);
        setAnswer(newAnswer);
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        quizInteractionHandler.sendAnswer([answer], '123');
        const result = question.options[answer];
        if(result.isCorrectAnswer) {
            setHelperText('You got it!');
        } else {
            setHelperText('Sorry, wrong answer!');
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <FormControl sx={{ m: 3 }} variant="standard">
                <FormLabel id="demo-error-radios">{question.label}</FormLabel>
                <RadioGroup
                    aria-labelledby="demo-error-radios"
                    name="quiz"
                    value={answer}
                    onChange={handleRadioChange}
                >
                    {question.options.map((option, index) => (
                        <FormControlLabel key={index} value={index} control={<Radio />} label={option.label} />
                    ))}
                </RadioGroup>
                <FormHelperText>{helperText}</FormHelperText>
                <Button sx={{ mt: 1, mr: 1 }} type="submit" variant="outlined">
                    Check Answer
                </Button>
            </FormControl>
        </form>
    );
};

export default SingleAnswer;

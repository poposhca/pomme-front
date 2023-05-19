import { useState } from "react";
import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';

const MultipleAnswer = () => {
    const [answers, setAnswers] = useState({
        answer0: false,
        answer1: false,
        answer2: false
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(`EVENT: ${event.target.name} ${event.target.checked}`);
        setAnswers({
            ...answers,
            [event.target.name]: event.target.checked
        });
    }

    return(
        <Box sx={{ display: 'flex' }}>
            <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
                <FormLabel component="legend">Assign responsibility</FormLabel>
                <FormGroup>
                    <FormControlLabel
                        control={
                            <Checkbox checked={answers.answer0} onChange={handleChange} name="answer0" />
                        }
                        label="Gilad Gray"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox checked={answers.answer1} onChange={handleChange} name="answer1" />
                        }
                        label="Jason Killian"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox checked={answers.answer2} onChange={handleChange} name="answer2" />
                        }
                        label="Antoine Llorca"
                    />
                </FormGroup>
                <FormHelperText>Be careful</FormHelperText>
            </FormControl>
        </Box>
    );
}

export default MultipleAnswer;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Reveal from 'reveal.js';
import React, { useEffect, Children } from "react";
import Box from '@mui/material/Box';
import '/node_modules/reveal.js/dist/reset.css'
import '/node_modules/reveal.js/dist/reveal.css';
import '/node_modules/reveal.js/dist/theme/black.css';
import './presentation.css';

type props = {
    children: React.ReactNode;
};

const Presentation = ({ children }: props)=> {
    useEffect(() => {
        const deck = new Reveal();
        deck.initialize({
            embedded: true,
        });
    });

    return (
        <Box sx={{
            height: '80vh',
        }}>
            <div className="reveal">
                <div className="slides">
                    {Children.only(children)}
                </div>
            </div>
        </Box>
    )
};

export default Presentation;

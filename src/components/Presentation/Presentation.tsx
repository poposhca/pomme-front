// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Reveal from 'reveal.js';
import '/node_modules/reveal.js/dist/reset.css'
import '/node_modules/reveal.js/dist/reveal.css';
import '/node_modules/reveal.js/dist/theme/black.css';
import './presentation.css';
import { useEffect } from "react";

const Presentation = () => {
    useEffect(() => {
        const deck = new Reveal();
        deck.initialize({
            embedded: true,
        });
    });

    return (
        <div>
            <div className="reveal">
                <div className="slides">
                    <section>SLIDE 1</section>
                </div>
            </div>
        </div>
    )
};

export default Presentation;

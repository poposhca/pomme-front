import Reveal from 'reveal.js';
import Markdown from 'reveal.js/plugin/markdown/markdown.esm.js';
import '/node_modules/reveal.js/dist/reveal.css';
import '/node_modules/reveal.js/dist/theme/black.css';
import { useEffect } from "react";

const Presentation = () => {
    useEffect(() => {
        const deck = new Reveal({
            plugins: [ Markdown ]
        })
        deck.initialize();
    }, []);

    return (
        <>
            <div className="reveal">
                <div className="slides">
                    <section>Slide 1</section>
                    <section>Slide 2</section>
                </div>
            </div>
        </>
    )
};

export default Presentation;

import Option from "./Option.ts";

interface IQuizIterator {
    goTo: (index: number) => Option;
    previous: () => Option;
    next: () => Option;
}

export default IQuizIterator;

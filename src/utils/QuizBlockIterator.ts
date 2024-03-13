import { QuizBlock, IQuizIterator } from '../models'

const quizIterator = (items: QuizBlock[]): IQuizIterator => {
    let actualBlockIntex = 0;
    let actualItemIndex = 0;
    return ({
        goTo: (index: number) => {
            // TODO: Implement this method
            throw new Error('Method not implemented.');
        },
        currentQuestion: () => {
            const actualBlock = items[actualBlockIntex];
            return actualBlock.quizItems[actualItemIndex];
        },
        previous: () => {
            const newItemIndex = actualItemIndex - 1;
            if (newItemIndex < 0) {
                actualBlockIntex--;
                actualItemIndex = items[actualBlockIntex].quizItems.length - 1;
            } else {
                actualItemIndex = newItemIndex;
            }
            return items[actualBlockIntex].quizItems[actualItemIndex];
        },
        next: () => {
            const newItemIndex = actualItemIndex + 1;
            const actualItemsLength = items[actualBlockIntex].quizItems.length;
            if (newItemIndex === actualItemsLength) {
                actualBlockIntex++;
                actualItemIndex = 0;
            } else {
                actualItemIndex = newItemIndex;
            }
            return items[actualBlockIntex].quizItems[actualItemIndex];
        },
        getCurrent: () => {
            return actualBlockIntex + actualItemIndex;
        },
        getLength: () => {
            const lastBlockId = items[items.length - 1].blockId;
            const lastBlockItemsLength = items[items.length - 1].quizItems.length;
            return lastBlockId + lastBlockItemsLength;
        },
    });
}

export default quizIterator;

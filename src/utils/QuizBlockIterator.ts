import { QuizBlock, IQuizIterator } from '../models'

const quizBlockIterator = (items: QuizBlock[]): IQuizIterator => {
    let actualBlockIndex = 0;
    let actualItemIndex = 0;
    return ({
        goTo: (index: number) => {
            // TODO: Implement this method
            console.log(`index ${index}`);
            throw new Error('Method not implemented.');
        },
        currentQuestion: () => {
            const actualBlock = items[actualBlockIndex];
            return actualBlock.quizItems[actualItemIndex];
        },
        previous: () => {
            const newItemIndex = actualItemIndex - 1;
            if (newItemIndex < 0) {
                actualBlockIndex--;
                actualItemIndex = items[actualBlockIndex].quizItems.length - 1;
            } else {
                actualItemIndex = newItemIndex;
            }
            return items[actualBlockIndex].quizItems[actualItemIndex];
        },
        next: () => {
            const newItemIndex = actualItemIndex + 1;
            const actualItemsLength = items[actualBlockIndex].quizItems.length;
            if (newItemIndex === actualItemsLength) {
                actualBlockIndex++;
                actualItemIndex = 0;
            } else {
                actualItemIndex = newItemIndex;
            }
            return items[actualBlockIndex].quizItems[actualItemIndex];
        },
        getCurrent: () => {
            return items[actualBlockIndex].blockId + actualItemIndex;
        },
        getLength: () => {
            const lastBlockId = items[items.length - 1].blockId;
            const lastBlockItemsLength = items[items.length - 1].quizItems.length;
            return lastBlockId + lastBlockItemsLength;
        },
    });
}

export default quizBlockIterator;

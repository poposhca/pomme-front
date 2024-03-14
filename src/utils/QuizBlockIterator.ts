import { QuizBlock, IQuizIterator } from '../models'

const quizBlockIterator = (items: QuizBlock[]): IQuizIterator => {
    let actualBlockIndex = 0;
    let actualItemIndex = 0;

    const binarySearch = (target: number): QuizBlock | null => {
        // Edge case, if the target is greater than the length of the quiz
        if(target > items.length) {
            const lastBlock = items[items.length - 1];
            if (lastBlock.quizItems.length + lastBlock.blockId -1 < target) {
                return null;
            }
            return lastBlock;
        }
        // Do the search
        let left = 0;
        let right = items.length - 1;
        while (left <= right) {
            const middle = Math.floor((left + right) / 2);
            const middleId = items[middle].blockId;
            if (middleId <= target && items[middle + 1].blockId > target) {
                return items[middle];
            } else if (middleId < target) {
                left = middle + 1;
            } else {
                right = middle - 1;
            }
        }
        return null;
    }

    return ({
        goTo: (index: number) => {
            const blockResult = binarySearch(index);
            if (blockResult) {
                actualBlockIndex = items.indexOf(blockResult);
                actualItemIndex = index - blockResult.blockId;
                return items[actualBlockIndex].quizItems[actualItemIndex];
            } else {
                throw new Error('Index out of bounds');
            }
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
        resetBlock: () => {
            actualItemIndex = 0;
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

import { ApolloClient, InMemoryCache } from '@apollo/client';
import IGetQuizData from "../IGetQuizData.ts";
import { QuizItem, QuizInfo } from "../../models/index.ts";
import quizQueries from "./queires.ts";
import {API_URL} from "../../config.ts";

const gqlQuestionHandler = (): IGetQuizData  => {
    let quizItems: QuizItem[] = [];
    let quizAdminId = '';
    const client = new ApolloClient({
        uri: API_URL,
        cache: new InMemoryCache(),
    });

    const getQuiz = async ({ quizId }: {quizId: string}) => {
        try {
            const result = await client.query({
                query: quizQueries.GET_QUIZ(quizId),
            });
            quizItems = JSON.parse(result.data.quiz.quizItems) as QuizItem[];
            quizAdminId = result.data.quiz.adminId;
        } catch (error) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            throw new Error(`GQL ERROR ${error.message}`);
        }
    };

    return ({
        getQuiz: async ({ quizId }) => {
            await getQuiz({ quizId });
            return quizItems;
        },
        getQuizAdminId: async ({ quizId }) => {
            await getQuiz({ quizId });
            return quizAdminId;
        },
        getQuizzesList: async () => {
            const result = await client.query({
                query: quizQueries.GET_ALL_QUIZZES_INFO(),
            });
            const quizzesInfo = result.data.getAllQuizesInfo as QuizInfo[];
            return quizzesInfo;
        },
    });
};

export default gqlQuestionHandler;

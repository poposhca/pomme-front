import { ApolloClient, InMemoryCache } from '@apollo/client';
import IGetQuizData from "../IGetQuizData.ts";
import QuizItems from "../../models/QuizItem.ts";
import quizQueries from "./queires.ts";

const gqlQuestionHandler = (): IGetQuizData  => {
    let quizItems: QuizItems[] = [];
    let quizAdminId = '';
    const client = new ApolloClient({
        uri: 'https://orca-app-co6wj.ondigitalocean.app/pomme-api',
        cache: new InMemoryCache(),
    });

    const getQuiz = async ({ quizId }: {quizId: string}) => {
        try {
            const result = await client.query({
                query: quizQueries.GET_QUIZ(quizId),
            });
            console.log(result);
            quizItems = JSON.parse(result.data.quiz.quizItems) as QuizItems[];
            quizAdminId = result.data.quiz.adminId;
        } catch (error) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            throw new Error(`GQL ERROR ${error.message}`);
        }
    };

    return ({
        getQuiz: async ({ quizId }) => {
            if(quizItems.length === 0) await getQuiz({ quizId });
            return quizItems;
        },
        getQuizAdminId: async ({ quizId }) => {
            if(quizAdminId === '') await getQuiz({ quizId });
            return quizAdminId;
        },
    });
};

export default gqlQuestionHandler;

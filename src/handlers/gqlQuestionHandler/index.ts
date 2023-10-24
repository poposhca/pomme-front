import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import IGetQuizData from "../../models/IGetQuizData.ts";
import QuizItems from "../../models/QuizItem.ts";

const gqlQuestionHandler = (): IGetQuizData  => {
    let quizItems: QuizItems[] = [];
    let quizAdminId = '';
    const client = new ApolloClient({
        uri: 'https://orca-app-co6wj.ondigitalocean.app/pomme-api',
        cache: new InMemoryCache(),
    });

    const getQuiz = async () => {
        try {
            const result = await client.query({
                query: gql`
                    query GetQuiz {
                        quiz(id: "6dbec2ed-4354-4423-9b7e-4552d4c4f1a3") {
                            quizItems
                            adminId
                        }
                    }
                `,
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
        getQuiz: async () => {
            if(quizItems.length === 0) await getQuiz();
            return quizItems;
        },
        getQuizAdminId: async () => {
            if(quizAdminId === '') await getQuiz();
            return quizAdminId;
        },
    });
};

export default gqlQuestionHandler;

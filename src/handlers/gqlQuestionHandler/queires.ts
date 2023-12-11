import { gql } from '@apollo/client';

const quizQueries = {
    GET_QUIZ: (quizId: string) => gql`
        query GetQuiz {
            quiz(id: "${quizId}") {
                quizItems
                adminId
            }
        }`,
    GET_ALL_QUIZZES_INFO: () => gql`
        query GetAllQuizzesInfo {
            getAllQuizesInfo {
                id
                name
                image
                updatedAt
                createdAt
            }
    }`
};

export default quizQueries;

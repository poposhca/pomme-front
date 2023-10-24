import { Children } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
    uri: 'https://flyby-router-demo.herokuapp.com/',
    cache: new InMemoryCache(),
});

type Props = {
    children: any;
};

const ApiClient = ({ children }: Props) => (
    <ApolloProvider client={client}>
        {Children.map(children, (child) => child)}
    </ApolloProvider>
);

export default ApiClient;

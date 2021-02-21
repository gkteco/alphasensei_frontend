import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {App} from './App';
import reportWebVitals from './reportWebVitals';
import { createHttpLink } from '@apollo/react-hooks';
import { setContext } from '@apollo/client/link/context'
import { getAccessToken } from './accessToken';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import 'semantic-ui-css/semantic.min.css'







const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
  credentials: "include",
})

const authLink = setContext((_, { headers }) => {
  const accessToken = getAccessToken();
  return {
    headers: {
      authorization: `bearer ${accessToken}`
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

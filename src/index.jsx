import 'core-js/stable';
import 'regenerator-runtime/runtime';

import {
	APP_INIT_ERROR, APP_READY, subscribe, initialize,
} from '@edx/frontend-platform';
import { AppProvider, ErrorPage } from '@edx/frontend-platform/react';
import ReactDOM from 'react-dom';

import Header, { messages as headerMessages } from '@edx/frontend-component-header';
import Footer, { messages as footerMessages } from '@edx/frontend-component-footer';

import appMessages from './i18n';
import ExamplePage from './example/ExamplePage';

import './index.scss';

import { ApolloClient, ApolloProvider, InMemoryCache, HttpLink } from '@apollo/client';

subscribe(APP_READY, () => {

	const createApolloClient = () => {
		return new ApolloClient({
			cache: new InMemoryCache(),
			link: new HttpLink({
				uri: process.env.REACT_APP_HASURA_URI || '',
				headers: {
					"x-hasura-admin-secret": process.env.REACT_APP_HASURA_SECRET || '',
				},
			}),
		});
	};

	const client = createApolloClient();

	ReactDOM.render(
		<AppProvider>
			<Header />
			<ApolloProvider client={client}>
				<ExamplePage />
			</ApolloProvider>
			<Footer />
		</AppProvider>,
		document.getElementById('root'),
	);
});

subscribe(APP_INIT_ERROR, (error) => {
	ReactDOM.render(<ErrorPage message={error.message} />, document.getElementById('root'));
});

initialize({
	messages: [
		appMessages,
		headerMessages,
		footerMessages,
	],
});

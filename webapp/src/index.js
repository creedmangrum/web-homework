import React from 'react'
import ReactDOM from 'react-dom'
import AppRouter from './routes'
import { ApolloProvider } from 'react-apollo'
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks'

import { client } from './network/apollo-client'

ReactDOM.render(
  (
    <div data-app-init=''>
      <ApolloProvider client={client}>
        <ApolloHooksProvider
          client={client}
        >
          <AppRouter />

        </ApolloHooksProvider>
      </ApolloProvider>
    </div>
  ),
  document.getElementById('react-app')
)

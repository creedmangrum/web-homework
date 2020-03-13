import React, { Fragment } from 'react'
import { func, string, number } from 'prop-types'
import { useMutation, useQuery } from 'react-apollo-hooks'
import { transactionsQuery, removeTransactionMutation } from '../gql/transactionGQL'
import { useHistory } from 'react-router-dom'

function TransactionRow ({ amount, description, id, refetchTrxs }) {
  let history = useHistory()
  let [removeTransaction] = useMutation(removeTransactionMutation, {
    variables: {
      id
    }
  })
  return (
    <div>
      <span>{description}</span>
      <span>{amount}</span>
      <button
        onClick={() => {
          history.push(`/transaction/edit/${id}`)
        }}
        type='button'
      >
        Edit
      </button>
      <button
        onClick={() => {
          removeTransaction().then(() => {
            refetchTrxs()
          })
        }}
        type='button'
      >
        Remove
      </button>
    </div>
  )
}

TransactionRow.propTypes = {
  amount: number,
  description: string,
  id: string,
  refetchTrxs: func
}

export function Home () {
  const transactionsGQL = useQuery(transactionsQuery)
  let history = useHistory()
  if (transactionsGQL.loading) return null
  console.log({ transactions: transactionsGQL.data })
  return (
    <Fragment>
      <button onClick={() => history.push('/transaction/add')}>Add Transaction</button>
      <div>Ready, steady, go!!!
      </div>
      {transactionsGQL.data.transactions.map((trx, index) => {
        return (
          <TransactionRow
            {...trx}
            key={index}
            refetchTrxs={transactionsGQL.refetch}
          />
        )
      })}
    </Fragment>
  )
}

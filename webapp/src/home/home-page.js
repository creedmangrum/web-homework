import React, { Fragment, useState } from 'react'
import { bool, func } from 'prop-types'
import { useQuery, useMutation } from 'react-apollo-hooks'
import { transactionsQuery, addTransactionMutation } from '../gql/transactionGQL'
import ReactModal from 'react-modal'

function AddTransactionModal ({ isOpen, onClose = () => {} }) {
  /* eslint-disable-next-line */
  const [addTransaction] = useMutation(addTransactionMutation)
  /* eslint-disable-next-line */
  const [transactionData, setTransactionData] = useState({
    amount: '',
    credit: '',
    debit: '',
    description: ''
  })
  return (
    <ReactModal
      {...{ isOpen }}
    >
      <span> Hello Modal </span>
      <button onClick={() => onClose()}>Close</button>
    </ReactModal>
  )
}

AddTransactionModal.propTypes = {
  isOpen: bool,
  onClose: func
}

export function Home () {
  const [addModalOpen, setAddModalOpen] = useState(false)
  const transactionsGQL = useQuery(transactionsQuery)
  if (transactionsGQL.loading) return null
  let transactions = (transactionsGQL.data && transactionsGQL.data.transactions) || []
  console.log({ transactions })
  return (
    <Fragment>
      <button onClick={() => setAddModalOpen(true)}>Add Transaction</button>
      <div>Ready, steady, go!!!
      </div>

      <AddTransactionModal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
      />
    </Fragment>
  )
}

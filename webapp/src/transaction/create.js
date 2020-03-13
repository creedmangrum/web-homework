import React, { useState } from 'react'
import { func, string } from 'prop-types'
import { useMutation } from 'react-apollo-hooks'
import { addTransactionMutation } from '../gql/transactionGQL'
import { useHistory } from 'react-router-dom'

function FormInput ({ label, value, onChange }) {
  return (
    <div>
      <label>{label}</label>
      <input
        onChange={e => {
          onChange(e.target.value)
        }}
        type='text'
        value={value}
      />
    </div>
  )
}

FormInput.propTypes = {
  label: string,
  value: string,
  onChange: func
}

export function Create () {
  let history = useHistory()
  /* eslint-disable-next-line */
  const [addTransaction] = useMutation(addTransactionMutation)
  /* eslint-disable-next-line */
  const [transactionData, setTransactionData] = useState({
    amount: '',
    description: ''
  })
  // I am assuming that you can't both have credit and debit?
  const [isDebit, setIsDebit] = useState(false)
  return (
    <form
      onSubmit={e => {
        e.preventDefault()
        addTransaction({
          variables: {
            ...transactionData,
            amount: parseFloat(transactionData.amount),
            debit: isDebit,
            credit: !isDebit
          }
        }).then((res) => {
          console.log({ res })
          history.push('/')
        })
      }}
    >
      <div>
        <span>
          Debit?
        </span>
        <input
          checked={isDebit}
          onChange={(e) => {
            setIsDebit(e.target.checked)
          }}
          type='checkbox'
        />
      </div>
      {Object.keys(transactionData).map((label, index) => {
        return (
          <FormInput
            key={index}
            label={label}
            onChange={value => {
              setTransactionData({
                ...transactionData,
                [label]: value
              })
            }}
            value={transactionData[label]}
          />
        )
      })}
      <div>
        <button
          onClick={() => {
            history.push('/')
          }}
          type='button'
        >
          Cancel
        </button>
        <button
          type='submit'
        >
          Add Transaction
        </button>
      </div>
    </form>
  )
}

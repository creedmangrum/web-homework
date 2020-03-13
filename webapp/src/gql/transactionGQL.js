import gql from 'graphql-tag'

export const transactionQuery = gql`
    query transaction (
        $id: String
    ) {
        transaction (
            id: $id
        ) {
            id
            amount
            credit
            debit
            description
            merchant_id
            user_id
        }
    }
`

export const transactionsQuery = gql`
    query transactions (
        $amount: Float
        $credit: Boolean
        $debit: Boolean
        $description: String
        $merchant_id: String
        $user_id: String
    ) {
        transactions (
            amount: $amount
            credit: $credit
            debit: $debit
            description: $description
            merchant_id: $merchant_id
            user_id: $user_id
        ) {
            id
            amount
            credit
            debit
            description
            merchant_id
            user_id
        }
    }
`

export const addTransactionMutation = gql`
    mutation addTransaction (
        $amount: Float
        $credit: Boolean
        $debit: Boolean
        $description: String
        $merchant_id: String
        $user_id: String
    ) {
        addTransaction (
            amount: $amount
            credit: $credit
            debit: $debit
            description: $description
            merchant_id: $merchant_id
            user_id: $user_id
        ) {
            id
            amount
            credit
            debit
            description
            merchant_id
            user_id
        }
    }
`

export const editTransactionMutation = gql`
    mutation editTransaction (
        $id: String
        $amount: Float
        $credit: Boolean
        $debit: Boolean
        $description: String
        $merchant_id: String
        $user_id: String
    ) {
        editTransaction (
            id: $id
            amount: $amount
            credit: $credit
            debit: $debit
            description: $description
            merchant_id: $merchant_id
            user_id: $user_id
        ) {
            id
            amount
            credit
            debit
            description
            merchant_id
            user_id
        }
    }
`

export const removeTransactionMutation = gql`
    mutation removeTransaction (
        $id: String
    ) {
        removeTransaction (
            id: $id
        )
    }
`

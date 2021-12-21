import { type } from 'os';
import {createContext, useEffect, useState, ReactNode, useContext} from 'react'
import { api } from '../services/api';

interface Transaction{
    id:         number,
    amount:     number,
    title:      string,
    category:   string,
    type:       string,
    createdAt:  string
}

/*
interface TransactionInput{
    amount:     number,
    title:      string,
    category:   string,
    type:       string,
}
ou

type TransactionInput = Pick<Transaction,'amount' | 'title' | 'category' | 'type'>
*/
type TransactionInput = Omit<Transaction,'id' | 'createdAt'>

interface TransactionsProviderProps{
    children: ReactNode
}

interface TransactionsContextData{
    transactions: Transaction[],
    createTransaction: (transaction : TransactionInput) => Promise<void>
}

const TransactionsCotext = createContext<TransactionsContextData>(
    {} as TransactionsContextData
);

export function TransactionsProvider({children}: TransactionsProviderProps){
    const [transactions, setTransactions] = useState<Transaction[]>([])

    useEffect(() => {
       api.get('transactions')
       .then(response => {
        setTransactions(response.data.transactions)
       })
    }, []);

    async function createTransaction(transactionInput : TransactionInput){
        const response = await api.post('/transactions', {
            ...transactionInput,
            createdAt: new Date()
        })
        const {transaction} = response.data;

        setTransactions([
            ...transactions,
            transaction
        ]
        )
    }

    return(
        <TransactionsCotext.Provider 
            value={{transactions,createTransaction }}>
                {children}
        </TransactionsCotext.Provider>
    )
}

export function useTransactions(){
    const context = useContext(TransactionsCotext)

    return context
}
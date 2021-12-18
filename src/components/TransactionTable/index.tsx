import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { Container }    from "./styles";

interface Transaction{
    id:         number,
    amount:     number,
    title:      string,
    category:   string,
    type:       string,
    createdAt:  string
}

export  function TransactionTable() {

    const [transactions, setTransactions] = useState<Transaction[]>([])

    useEffect(() => {
       api.get('transactions')
       .then(response => {
        setTransactions(response.data.transactions)
       })
    }, [transactions]);

    return (
      <Container>
          <table>
            <thead>
                <tr>
                    <th>Titulos</th>
                    <th>Valor</th>
                    <th>Categoria</th>
                    <th>Data</th>
                </tr>
            </thead>
            <tbody>
               {transactions.map(transaction => {
                    <tr key={transaction.id}>
                        <td>{transaction.title}</td>
                        <td className={transaction.type}>{transaction.amount}</td>
                        <td>{transaction.category}</td>
                        <td>{transaction.createdAt}</td>
                    </tr>
               })}
            </tbody>
          </table>
      </Container>
    )
}

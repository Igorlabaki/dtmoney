import Modal        from "react-modal";
import { Container,TransactionTypeContainer,RadioBox }    from "./styles";
import closeImg     from '../../assets/close.svg'
import incomeImg    from '../../assets/income.svg'
import outcomeImg   from '../../assets/outcome.svg'
import { FormEvent, useState } from "react";
import { api } from "../../services/api";

interface NewTransactionModalProps{
    isOpen: boolean;
    onRequestClose: () => void;
}

export  function NewTransactionModal({isOpen,onRequestClose}: NewTransactionModalProps) {

    const [type,     setType]       = useState('deposit')
    const [title,    setTitle]      = useState<string>('')
    const [value,    setValue]      = useState<number>(0)
    const [category, setCategory]   = useState<string>('')

    function handlerCreateNewTransaction(event : FormEvent){
        event?.preventDefault()
        const data = {
            title,
            value,
            category,
            type
        };

        api.post('/transactions', data)
    }

    return (
        <Modal 
            isOpen={isOpen}  
            onRequestClose={onRequestClose}
            overlayClassName='react-modal-overlay'
            className='react-modal-content'
        >
            <Container onSubmit={handlerCreateNewTransaction}>
                <button type="button" onClick={onRequestClose} className="react-modal-close">
                    <img src={closeImg} alt="closeButton"/>
                </button>
                <h2>Cadastrar transacao</h2>
                <input
                    type="text" 
                    placeholder="Titulo" 
                    value={title} 
                    onChange={event => setTitle(event.target.value)}
                />
                <input 
                    type="number"
                    placeholder="Valor"  
                    value={value} 
                    onChange={event =>setValue(+event.target.value)}
                />

                <TransactionTypeContainer>
                    <RadioBox 
                        type="button" 
                        onClick={() => setType('deposit')}
                        isActive={type ==='deposit'}
                        activeColor='green'
                    >
                        <img src={incomeImg} alt="open modal" />
                        <span>Entrada</span>
                    </RadioBox>
                    <RadioBox 
                        type="button" 
                        onClick={() => setType('withdraw')}
                        isActive={type ==='withdraw'}
                        activeColor='red'
                    >
                        <img src={outcomeImg} alt="close modal" />
                        <span>Saida</span>
                    </RadioBox>
                </TransactionTypeContainer>
                <input 
                    type="text"     
                    placeholder="Categoria"
                    value={category} 
                    onChange={event =>setCategory(event.target.value)}
                />
                <button type="submit">Cadastrar</button>
            </Container>
        </Modal>
    )
}

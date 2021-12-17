import { Dashboard } from './components/Dashboard';
import { Header } from './components/Header';
import { GlobalStyle } from './styles/global';
import Modal from 'react-modal'
import { useState } from 'react';
import { NewTransactionModal } from './components/NewTransactionModal';

Modal.setAppElement('#root')

export function App() {

  const [isNewTransactionModalOpen, setisNewTransactionModalOpen] = useState(false)

  function handleOpenNewTransactionModal(){
    setisNewTransactionModalOpen(true)
  }

  function handleCloseNewTransactionModal(){
    setisNewTransactionModalOpen(false)
  }
  return (
    <>
      <GlobalStyle/>
      <Header onOpenNewTransactionModal={handleOpenNewTransactionModal}/>
      <Dashboard/>
      <NewTransactionModal isOpen={isNewTransactionModalOpen} onRequestClose={handleCloseNewTransactionModal}/>
    </>
  );
}

export default App;

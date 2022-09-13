import React from 'react';
import Header from '../components/Header';
import Table from '../components/Table';
import WalletForm from '../components/WalletForm';

class Wallet extends React.Component {
  render() {
    return (
      <div className="h-screen p-2">
        <h1 className='text-3xl font-bold'>Wallet</h1>
        <Header />
        <WalletForm />
        <Table />
      </div>
    );
  }
}

export default Wallet;

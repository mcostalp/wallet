import React from 'react';
import Header from '../components/Header';
import Table from '../components/Table';
import WalletForm from '../components/WalletForm';

class Wallet extends React.Component {
  render() {
    return (
      <div className="h-screen p-2 flex flex-col items-center md:w-4/6">
        <Header />
        <WalletForm />
        <Table />
      </div>
    );
  }
}

export default Wallet;

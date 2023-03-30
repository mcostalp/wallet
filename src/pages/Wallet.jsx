import React from "react";
import Header from "../components/Header";
import Table from "../components/Table";
import WalletForm from "../components/WalletForm";

class Wallet extends React.Component {
  render() {
    return (
      <div className="h-full w-full p-2 flex flex-col items-center">
        <Header />
        <WalletForm />
        {/* <Table /> */}
      </div>
    );
  }
}

export default Wallet;

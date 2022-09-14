import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./pages/Login";
import Wallet from "./pages/Wallet";

function App() {
  return (
    <div className="flex justify-center items-center h-screen bg-main-bg bg-green-500 bg-cover">
      <Switch>
        <Route exact path="/wallet" component={Login} />
        <Route exact path="/carteira" component={Wallet} />
      </Switch>
    </div>
  );
}

export default App;

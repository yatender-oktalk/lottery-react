import React, { Component } from "react";
import "./App.css";
import web3 from "./web3";
import lottery from "./lottery";

class App extends Component {
  state = {
    manager: "",
    players: [],
    balance: "",
    value: "",
    message: "",
  };

  async componentDidMount() {
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    console.log(players);
    const balance = await web3.eth.getBalance(lottery.options.address);

    this.setState({ manager, players, balance });
  }

  onSubmit = async (event) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();

    console.log(accounts);

    this.setState({ message: "Waiting for transaction success.." });

    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(this.state.value, "ether"),
    });

    this.setState({ message: "you are into lottery" });
  };

  render() {
    return (
      <div>
        <h2>Lottery Contract</h2>
        <p>This contract is managed by {this.state.manager}</p>
        <p>This contract is having players {this.state.players.length}</p>
        <p>
          This contract is having balance
          {web3.utils.fromWei(this.state.balance, "ether")} ether
        </p>

        <hr />
        <form onSubmit={this.onSubmit}>
          <h4>Want to try your luck?</h4>
          <div>
            <label> Amount of ether to enter</label>

            <input
              value={this.state.value}
              onChange={(event) => this.setState({ value: event.target.value })}
            />
            <div>
              <button>Enter</button>
            </div>
          </div>
        </form>
        <hr />
        <h1>{this.state.message}</h1>
      </div>
    );
  }
}

export default App;

import React, { Component } from "react";
import "./App.css";
import web3 from "./web3";
import lottery from "./lottery";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { manager: "", players: [] };
  }

  async componentDidMount() {
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call({ from: manager });
    this.setState({ manager, players });
  }

  render() {
    return (
      <div>
        <h2>Lottery Contract</h2>
        <p>This contract is managed by {this.state.manager}</p>
        <p>This contract is having players {this.state.players}</p>
      </div>
    );
  }
}

export default App;

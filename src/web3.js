import Web3 from "web3";

const web3 = new Web3(
  Web3.givenProvider || "ws://some.local-or-remote.node:8546"
);
// const web3 = new Web3(window.web3.currentProvider);

export default web3;

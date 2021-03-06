import Web3 from 'web3';
require('dotenv').config();
let web3;

if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
	window.ethereum.request({ method: 'eth_requestAccounts' });
	web3 = new Web3(window.ethereum);
} else {
	const rinkebyAddress = process.env.RINKEBY_INFURA_ADDRESS;
	const provider = new Web3.providers.HttpProvider(rinkebyAddress);
	web3 = new Web3(provider);
}

export default web3;

const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('./build/CampaignFactory.json');
require('dotenv').config();

const provider = new HDWalletProvider({
	mnemonic: process.env.MNEMONIC_PHRASE,
	providerOrUrl: process.env.RINKEBY_INFURA_ADDRESS,
});
const web3 = new Web3(provider);

(async () => {
	const accounts = await web3.eth.getAccounts();

	const result = await new web3.eth.Contract(compiledFactory.abi)
		.deploy({ data: compiledFactory.evm.bytecode.object })
		.send({ gas: '2000000', from: accounts[0] });

	console.log('address for new contract :>> ', result.options.address);
	provider.engine.stop();
})();

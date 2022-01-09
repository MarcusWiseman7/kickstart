// import { mount } from '@vue/test-utils';
const ganache = require('ganache-cli');
const Web3 = require('web3');

const web3 = new Web3(ganache.provider());
const compiledFactory = require('../ethereum/build/CampaignFactory.json');
const compiledCampaign = require('../ethereum/build/Campaign.json');

let accounts;
let factory;
let campaignAddress;
let campaign;

beforeEach(async () => {
	accounts = await web3.eth.getAccounts();
	factory = await new web3.eth.Contract(compiledFactory.abi)
		.deploy({ data: compiledFactory.evm.bytecode.object })
		.send({ from: accounts[0], gas: '2000000' });

	await factory.methods.createCampaign('100').send({
		from: accounts[0],
		gas: '1000000',
	});

	[campaignAddress] = await factory.methods.getDeployedCampaigns().call();
	campaign = await new web3.eth.Contract(compiledCampaign.abi, campaignAddress);
});

describe('Campaign', () => {
	test('deploys a factory and a campaign', () => {
		expect(factory.options.address).toBeTruthy();
		expect(campaign.options.address).toBeTruthy();
	});

	test('manager of campaign is caller', async () => {
		const manager = await campaign.methods.manager().call();

		expect(manager).toBe(accounts[0]);
	});

	test('allows people to contribute money and marks them as approvers', async () => {
		await campaign.methods.contribute().send({
			value: '200',
			from: accounts[1],
		});
		const approver = await campaign.methods.approvers(accounts[1]).call();

		expect(approver).toBeTruthy();
	});

	test('requires a minimum contribution', async () => {
		try {
			await campaign.methods.contribute().send({
				value: '5',
				from: accounts[2],
			});

			expect(false).toBeTruthy();
		} catch (err) {
			expect(err).toBeTruthy();
		}
	});

	test('allows manager to make a payment request', async () => {
		await campaign.methods.createRequest('Buy batteries', '100', accounts[1]).send({
			from: accounts[0],
			gas: '1000000',
		});
		const newRequest = await campaign.methods.requests(0).call();

		expect(newRequest.value).toBe('100');
		expect(newRequest.description).toBe('Buy batteries');
	});

	test('processes requests', async () => {
		await campaign.methods.contribute().send({
			from: accounts[0],
			value: web3.utils.toWei('10', 'ether'),
		});

		await campaign.methods
			.createRequest('Buy bread', web3.utils.toWei('5', 'ether'), accounts[1])
			.send({ from: accounts[0], gas: '1000000' });

		await campaign.methods.approveRequest(0).send({
			from: accounts[0],
			gas: '1000000',
		});

		await campaign.methods.finalizeRequest(0).send({
			from: accounts[0],
			gas: '1000000',
		});

		let balance = await web3.eth.getBalance(accounts[1]);
		balance = web3.utils.fromWei(balance, 'ether');
		balance = parseFloat(balance);

		expect(balance > 104);
	});
});

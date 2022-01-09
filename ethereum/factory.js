import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';
// require('dotenv').config();

const campaignAddress = '0x36311cE8abfeD756B783c8BCEE3724A49Bff9BCF'; // process.env.CAMPAIGN_FACTORY_CONTRACT_ADDRESS;
const instance = new web3.eth.Contract(CampaignFactory.abi, campaignAddress);

export default instance;

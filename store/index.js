import factory from '@/ethereum/factory';
import getCampaign from '@/ethereum/campaign';

export const state = () => ({
	campaigns: [],
	activeCampaign: null,
});

export const mutations = {
	campaigns(state, c) {
		state.campaigns = c;
	},
	activeCampaign(state, obj) {
		state.activeCampaign = obj;
	},
};

export const actions = {
	async nuxtServerInit({ commit }) {
		// Get deployed campaigns from deployed factory contract
		const campaigns = await factory.methods.getDeployedCampaigns().call();
		commit('campaigns', campaigns);
	},
	async getCampaigns({ commit }) {
		const campaigns = await factory.methods.getDeployedCampaigns().call();
		commit('campaigns', campaigns);
		return true;
	},
	async getCampaign({ commit }, address) {
		try {
			const campaign = await getCampaign(address);
			console.log('campaign :>> ', campaign._address);
			if (campaign?._address) {
				commit('activeCampaign', campaign);
				return true;
			}
		} catch (err) {
			console.warn('err :>> ', err);
		}
	},
};

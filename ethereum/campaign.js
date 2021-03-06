import web3 from './web3';
import compiledCampaign from './build/Campaign.json';

const Campaign = (address) => {
  return new web3.eth.Contract(JSON.parse(compiledCampaign.interface), address);
};

export default Campaign;

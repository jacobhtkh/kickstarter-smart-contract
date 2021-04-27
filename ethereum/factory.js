import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0xE183f6fe5DA252f6Dc3c09a966E83523a8963389'
);

export default instance;

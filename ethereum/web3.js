import Web3 from 'web3';

let web3;

if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
  // We are in browser and metamask is running.
  const injectedProvider = window.ethereum;
  injectedProvider.request({ method: 'eth_requestAccounts' });
  web3 = new Web3(injectedProvider);
} else {
  // We are on the server *OR* the user is not running metamask
  const provider = new Web3.providers.HttpProvider(
    'https://rinkeby.infura.io/v3/cf02805266be49dba057d017c570fd59'
  );
  web3 = new Web3(provider);
}

export default web3;

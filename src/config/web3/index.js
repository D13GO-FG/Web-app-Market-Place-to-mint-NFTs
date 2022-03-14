import Web3 from 'web3';
// Conectamos metamask dependiendo las redes
import { InjectedConnector } from '@web3-react/injected-connector';

// Definimos las redes
const connector = new InjectedConnector({
	supportedChainIds: [
		4, //Rinkeby
	],
});

// Funcion para tener acceso a las provider de metamask
const getLibrary = (provider) => {
	return new Web3(provider);
};

export { connector, getLibrary };

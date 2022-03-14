import {
	Flex,
	Button,
	Tag,
	TagLabel,
	Badge,
	TagCloseButton,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core';
import { connector } from '../../../config/web3';
import { useCallback, useEffect, useState } from 'react';
import useTruncatedAddress from '../../../hooks/useTruncatedAddress';

const WalletData = () => {
	const [balance, setBalance] = useState(0);
	// Funcion para detectar si esta activa la cuenta, la red y otras configuraciones
	const { active, activate, deactivate, account, error, library } =
		useWeb3React();
	// En caso de ser una red no soportada
	const isUnsupportedChain = error instanceof UnsupportedChainIdError;
	// Constante para conocer el estado de la conexion (activo/no activo)
	const connect = useCallback(() => {
		activate(connector);
		localStorage.setItem('previouslyConnected', 'true');
	}, [activate]);
	// En caso de desconectar cambia el estado del storage del browser
	const disconnect = () => {
		deactivate();
		localStorage.removeItem('previouslyConnected');
	};
	// Optener los datos del usuario a travez de la wallet
	const getBalance = useCallback(async () => {
		const toSet = await library.eth.getBalance(account);
		setBalance((toSet / 1e18).toFixed(2));
	}, [library?.eth, account]);
	// Si esta conectado en el provider
	useEffect(() => {
		if (active) getBalance();
	}, [active, getBalance]);
	// Si esta acito en el storage
	useEffect(() => {
		if (localStorage.getItem('previouslyConnected') === 'true') connect();
	}, [connect]);
	// Recortar public key en la interface
	const truncatedAddress = useTruncatedAddress(account);

	return (
		<Flex alignItems={'center'}>
			{active ? (
				<Tag colorScheme="green" borderRadius="full">
					<TagLabel>
						<Link to={`/punks?address=${account}`}>{truncatedAddress}</Link>
					</TagLabel>
					<Badge
						d={{
							base: 'none',
							md: 'block',
						}}
						variant="solid"
						fontSize="0.8rem"
						ml={1}
					>
						~{balance} Ξ
					</Badge>
					<TagCloseButton onClick={disconnect} />
				</Tag>
			) : (
				<Button
					variant={'solid'}
					colorScheme={'green'}
					size={'sm'}
					leftIcon={<AddIcon />}
					onClick={connect}
					disabled={isUnsupportedChain}
				>
					{isUnsupportedChain ? 'Red no soportada' : 'Conectar wallet'}
				</Button>
			)}
		</Flex>
	);
};

export default WalletData;

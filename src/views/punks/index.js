import { useWeb3React } from '@web3-react/core';
import { Grid } from '@chakra-ui/react';
import PunkCard from '../../components/punk-card';
import Loading from '../../components/loading';
import RequestAccess from '../../components/request-access';
import { usePlatziPunksData } from '../../hooks/usePlatziPunksData';

const Punks = () => {
	const { active } = useWeb3React();
	const { punks, loading } = usePlatziPunksData();

	if (!active) return <RequestAccess />;

	console.log(punks);

	return (
		<>
			{loading ? (
				<Loading />
			) : (
				<Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={6}>
					{punks.map(({ name, image, tokenId }) => {
						return <PunkCard key={tokenId} image={image} name={name} />;
					})}
				</Grid>
			)}
			<p>Hola</p>
			<div>
				{punks.map((tokenId, name) => {
					return <p key={tokenId}>{name}</p>;
				})}
			</div>
		</>
	);
};

export default Punks;

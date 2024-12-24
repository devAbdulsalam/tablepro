import axios from 'axios';

const fetchData = async () => {
	try {
		
		const response = await axios.get(
			// 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
			'http://sandbox-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
			{
				headers: {
					'X-CMC_PRO_API_KEY': 'ed014fa3-7aba-4f73-a04b-5f4bfaa5e241',
				},
			}
		);
		return response;
	} catch (error) {
		console.error('Error fetching data:', error);
		return null;
	}
};

export default fetchData;

// ed014fa3-7aba-4f73-a04b-5f4bfaa5e241

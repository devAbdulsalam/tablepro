/* eslint-disable no-undef */
import { useState, useEffect } from 'react';
import Select from './Select';
const data = [
	{ id: 1, name: 'Bitcoin', abv: 'BTC', value: 900 },
	{ id: 2, name: 'Ethereum', abv: 'ETH', value: 800 },
	{ id: 3, name: 'Tether', abv: 'USDT', value: 700 },
	{ id: 4, name: 'Binance Coin', abv: 'BNB', value: 600 },
	{ id: 5, name: 'USDT', abv: 'USDT', value: 500 },
];
function Form() {
	const [getAmount, setGetAmount] = useState('');
	const [sendAmount, setSendAmount] = useState('');
	const [wallet, setWallet] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const [selectedFrom, setSelectedFrom] = useState(data[0]);
	const [selectToData, setSelectToData] = useState(data);
	const [selectedTo, setSelectedTo] = useState(data[1]);
	const [conversionRate, setConversionRate] = useState(1);
	const apiUrl = import.meta.env.VITE_API_URL;

	const handleSubmit = async () => {
		if (!wallet) {
			setError('Please enter a tweet');
			return;
		}
		setLoading(true);
		setError('');
		try {
			const response = await fetch(`${apiUrl}/tweets`, {
				method: 'POST',
				body: JSON.stringify({
					text: text,
					tweet_mode: 'extended',
				}),
			});
			const data = await response.json();
			console.log(data);
			setLoading(false);
			setError('');
		} catch (error) {
			console.log(error);
			setLoading(false);
			setError(error.message);
		}
	};
	// // Update conversion rate based on selectedFrom and selectedTo
	// useEffect(() => {
	// 	if (selectedFrom && selectedTo) {
	// 		const rate = selectedFrom.value / selectedTo.value;
	// 		setConversionRate(rate);
	// 	}
	// }, [selectedFrom, selectedTo]);
	// // Update getAmount dynamically when sendAmount changes
	// useEffect(() => {
	// 	if (sendAmount) {
	// 		setGetAmount((parseFloat(sendAmount) * conversionRate).toFixed(2));
	// 	}
	// }, [sendAmount, conversionRate]);
	// useEffect(() => {
	// 	if (getAmount) {
	// 		setSendAmount((parseFloat(getAmount) / conversionRate).toFixed(2));
	// 	}
	// }, [getAmount, conversionRate]);

	useEffect(() => {
		const filteredData = data.filter((item) => item.id !== selectedFrom.id);
		setSelectToData(filteredData || []);
	}, [selectedFrom]);
	return (
		<div className="flex justify-center py-10">
			<div className=" rounded-xl bg-white text-left align-middle shadow-xl transition-all font-josefin min-w-[600px] max-w-2xl mx-auto">
				<div className="space-y-5 p-4">
					<div>
						<h2>Please fill in transaction details</h2>
					</div>
					<div>
						<label htmlFor="sendAmount" className="my-1">
							You send
						</label>
						<div className="flex items-center">
							<input
								type="text"
								id="sendAmount"
								value={sendAmount}
								placeholder="100"
								onChange={(e) => setSendAmount(e.target.value)}
								className="input p-2 rounded-md resize-none w-full border border-gray  text-black flex-1 mr-2"
							/>
							<div className="flex-1 mr-2 relative">
								<Select
									data={data}
									selectItem={selectedFrom}
									setSelectItem={setSelectedFrom}
								/>
							</div>
						</div>
					</div>
					<div>
						<label htmlFor="getAmount" className="my-1">
							You get
						</label>
						<div className="flex items-center">
							<input
								type="text"
								id="getAmount"
								value={getAmount}
								placeholder="100"
								onChange={(e) => setGetAmount(e.target.value)}
								className="input p-2 rounded-md resize-none w-full border border-gray   text-black flex-1 mr-2"
							/>
							<div className="flex-1 mr-2 relative">
								<Select
									data={selectToData}
									selectItem={selectedTo}
									setSelectItem={setSelectedTo}
								/>
							</div>
						</div>
					</div>
					<div>
						<label htmlFor="wallet" className="my-1">
							Recipient Wallet
						</label>
						<input
							type="text"
							id="wallet"
							value={wallet}
							placeholder="text"
							onChange={(e) => setWallet(e.target.value)}
							className="input p-2 rounded-md resize-none w-full border border-gray mt-1  text-black"
						/>
						{/* <p>This is a placeholder for the recipient's wallet address</p> */}
					</div>
					{error && <p className="text-red-500">{error}</p>}
					<button
						disabled={loading}
						className="bg-blue-500 hover:bg-blue-700 text-white font-semibold  py-3 w-full flex items-center justify-center rounded-md transition-all duration-500 ease-in-out"
						onClick={handleSubmit}
					>
						<span>{loading ? 'Getting Funds...' : 'Get Funds'}</span>
					</button>
				</div>
			</div>
		</div>
	);
}

export default Form;

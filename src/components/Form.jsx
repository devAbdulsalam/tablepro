/* eslint-disable no-undef */
import { useState, useEffect } from 'react';
import Select from './Select';
import axios from 'axios';

function Form({ data }) {
	const [getAmount, setGetAmount] = useState('');
	const [sendAmount, setSendAmount] = useState('');
	const [wallet, setWallet] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const [selectedFrom, setSelectedFrom] = useState(null);
	const [selectToData, setSelectToData] = useState([]);
	const [selectedTo, setSelectedTo] = useState([]);
	const [conversionRate, setConversionRate] = useState(150);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			try {
				axios.get(apiUrl, { mode: 'no-cors' }).then((response) => {
					const newData = response.data.data;
					console.log('crypo datas', newData);
					setData(newData);
				});
				setLoading(false);
				// const data = await response.json();
			} catch (error) {
				setLoading(false);
				console.error('Error fetching data:', error);
			}
		};
		fetchData();
	}, [apiUrl]);
	// Update conversion rate when `selectedFrom` or `selectedTo` changes
	useEffect(() => {
		if (selectedFrom && selectedTo) {
			const fromRate = selectedFrom.value || 1;
			const toRate = selectedTo.value || 1;
			setConversionRate(toRate / fromRate);
		}
	}, [selectedFrom, selectedTo]);

	// Auto-calculate the `getAmount` when `sendAmount` changes
	useEffect(() => {
		if (conversionRate && sendAmount) {
			const calculatedAmount = (
				parseFloat(sendAmount) * conversionRate
			).toFixed(2);
			setGetAmount(calculatedAmount);
		}
	}, [sendAmount, conversionRate]);

	useEffect(() => {
		const filteredData = data?.filter((item) => item.id !== selectedFrom?.id);
		setSelectToData(filteredData || []);
	}, [selectedFrom, data]);

	const handleSubmit = async () => {
		if (!wallet) {
			setError('Please enter a recipient wallet address');
			return;
		}
		setLoading(true);
		setError('');
		try {
			const response = await axios.post(`${apiUrl}/convert`, {
				wallet,
				sendAmount,
				getAmount,
				selectedFrom,
				selectedTo,
			});
			const result = await response.json();
			console.log(result);
			setLoading(false);
			setError('');
		} catch (error) {
			console.log(error);
			setLoading(false);
			setError(error.message);
		}
	};

	return (
		<div className="flex justify-center py-10">
			<h2 className="text-center font-bold my-4">
				Please fill in transaction details
			</h2>
			<div className="rounded-xl bg-slate-800/50 text-left align-middle shadow-xl transition-all font-josefin min-w-[600px] max-w-2xl mx-auto">
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
								type="number"
								id="sendAmount"
								value={sendAmount}
								placeholder="100"
								onChange={(e) => setSendAmount(e.target.value)}
								className="input p-2 rounded-md resize-none w-full border border-gray text-black flex-1 mr-2"
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
								disabled
								placeholder="Calculated Amount"
								className="input p-2 rounded-md resize-none w-full border border-gray text-black flex-1 mr-2"
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
							placeholder="Wallet Address"
							onChange={(e) => setWallet(e.target.value)}
							className="input p-2 rounded-md resize-none w-full border border-gray mt-1 text-black"
						/>
					</div>
					{error && <p className="text-red-500">{error}</p>}
					<button
						disabled={loading}
						className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-3 w-full flex items-center justify-center rounded-md transition-all duration-500 ease-in-out"
						onClick={handleSubmit}
					>
						<span>{loading ? 'Processing...' : 'Submit Transaction'}</span>
					</button>
				</div>
			</div>
		</div>
	);
}

export default Form;

import { useEffect, useState } from 'react';
import Form from '../components/Form';
import Loader from '../components/Loader';
import axios from 'axios';
import { InputBox } from '../components';
import useCurrencyInfo from '../hooks/useCurrencyInfo';
import backgroundImage from '../assets/background.jpg';

function Index() {
	const [amount, setAmount] = useState(``);
	const [from, setFrom] = useState('usd');
	const [to, setTo] = useState('btc');
	const [convertedAmount, setConvertedAmount] = useState('');
	const [wallet, setWallet] = useState('');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const [conversionRate, setConversionRate] = useState(150);
	const apiUrl = import.meta.env.VITE_APP_COINLORE_API;

	const currencyInfo = useCurrencyInfo(from);
	// console.log(Object.keys(currencyInfo));
	const options = Object.keys(currencyInfo);

	const swap = () => {
		setFrom(to);
		setTo(from);
		setConvertedAmount(amount);
		setAmount(convertedAmount);
	};

	useEffect(() => {
		if (amount && to) {
			setConvertedAmount(amount * currencyInfo[to]);
		}
	}, [amount, to, currencyInfo]);

	const handleSubmit = async () => {
		if (!wallet.trim()) {
			setError('Please enter a recipient wallet address');
			return;
		}
		setLoading(true);
		setError('');
		try {
			const data = {
				wallet,
				sendAmount: amount,
				selectedFrom: from,
				selectedTo: to,
			};
			// const response = await axios.post(`${apiUrl}/convert`, data);
			// const result = await response.json();
			console.log(data);
			setLoading(false);
			setError('');
		} catch (error) {
			console.log(error);
			setLoading(false);
			setError(error.message);
		}
	};
	return (
		<>
			<div className="flex flex-col justify-center bg-slate-800">
				<div
					className="w-full h-screen flex flex-wrap justify-center items-center"
					style={{
						backgroundImage: `url('${backgroundImage}')`,
					}}
				>
					<div className="w-full p-2">
						<h1 className="text-white text-center text-4xl mb-10">Gas swap</h1>
						<div className="w-full sm:min-w-[600px] max-w-2xl mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-slate-300/50">
							<form>
								<div className="w-full mb-1">
									<InputBox
										title="You send"
										label="From"
										amount={amount}
										currencyOptions={options}
										onCurrencyChange={(currency) => setFrom(currency)}
										selectCurrency={from}
										onAmountChange={(amount) => setAmount(amount)}
									/>
								</div>
								<div className="relative w-full h-0.5">
									<button
										type="button"
										className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-black text-white px-2 py-0.5"
										onClick={swap}
									>
										swap
									</button>
								</div>
								<div className="w-full mt-1 mb-4">
									<InputBox
										title="You receive"
										label="To"
										amount={convertedAmount}
										currencyOptions={options}
										onCurrencyChange={(currency) => setTo(currency)}
										selectCurrency={to}
										amountDisable
									/>
								</div>
								<div className="w-full my-4">
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
								{error && (
									<p className="text-red-600 text-center py-2">{error}</p>
								)}
								<button
									disabled={loading}
									className="bg-black hover:bg-black text-white font-semibold py-3 w-full flex items-center justify-center rounded-md transition-all duration-500 ease-in-out"
									onClick={handleSubmit}
								>
									<span>
										{loading ? 'Processing...' : 'Submit Transaction'}
									</span>
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
			{loading && <Loader />}
		</>
	);
}

export default Index;

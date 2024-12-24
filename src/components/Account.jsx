import { useState } from 'react';

const Index = () => {
	const [amount, setAmount] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const handleSubmit = async () => {
		if (!amount) {
			return setError('Amount is required');
		}
		setLoading(true);
		setError('');
		console.log(amount);
		setLoading(false);
		setError('');
	};
	return (
		<div>
			<div className="flex justify-center py-10">
				<div className=" rounded-xl bg-white text-left align-middle shadow-xl transition-all font-josefin min-w-[600px] max-w-2xl mx-auto">
					<div className="space-y-5 p-4">
						<div>
							<label htmlFor="amount" className="my-1">
								Amount
							</label>
							<input
								type="number"
								id="amount"
								placeholder="0"
								onChange={(e) => setAmount(e.target.value)}
								className="input p-2 rounded-md resize-none w-full border border-gray mt-1  text-black"
							/>
						</div>
						{error && <p className="text-red-500">{error}</p>}
						<button
							disabled={loading}
							className="bg-blue-500 hover:bg-blue-700 text-white font-semibold h-10 py-1 w-full flex items-center justify-center rounded-md transition-all duration-500 ease-in-out"
							onClick={handleSubmit}
						>
							<span>{loading ? 'Getting Funds...' : 'Get Funds'}</span>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Index;

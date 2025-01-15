import React, { useId } from 'react';

function InputBox({
	title,
	label,
	amount,
	onAmountChange,
	onCurrencyChange,
	currencyOptions = [],
	selectCurrency = 'usd',
	amountDisabled = false,
	currencyDisable = false,
	className = '',
}) {
	const amountInputId = useId();

	return (
		<div className={`bg-white p-3 rounded-lg text-sm md:flex ${className}`}>
			<div className="w-full md:w-1/2">
				<label
					htmlFor={amountInputId}
					className="text-black/80 mb-2 inline-block"
				>
					{title}
				</label>
				<input
					id={amountInputId}
					className="outline-none w-full bg-slate-100 py-1.5 px-2 border border-slate-200 rounded-md"
					type="number"
					placeholder="Amount"
					disabled={amountDisabled}
					value={amount}
					onChange={(e) =>
						onAmountChange && onAmountChange(Number(e.target.value))
					}
				/>
			</div>
			<div className="w-full md:w-1/2 md:flex flex-wrap justify-end md:text-right">
				<p className="text-black/90 mb-2 w-full">{label}</p>
				<select
					className="rounded-sm px-1 py-2 cursor-pointer outline-none w-full md:w-1/2 uppercase bg-slate-200"
					value={selectCurrency}
					onChange={(e) => onCurrencyChange && onCurrencyChange(e.target.value)}
					disabled={currencyDisable}
				>
					{currencyOptions.map((currency) => (
						<option key={currency} value={currency} className="uppercase p-1 ">
							{currency}
						</option>
					))}
				</select>
			</div>
		</div>
	);
}

export default InputBox;

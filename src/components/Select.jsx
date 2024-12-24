/* eslint-disable react/prop-types */
import { useState, useEffect, useCallback } from 'react';

function debounce(fn, delay) {
	let timeoutId;
	const debounced = (...args) => {
		clearTimeout(timeoutId);
		timeoutId = setTimeout(() => fn(...args), delay);
	};
	debounced.cancel = () => clearTimeout(timeoutId); // Optional: Add cancel method
	return debounced;
}

function SelectField({ data, setSelectItem, selectItem }) {
	const [query, setQuery] = useState('');
	const [isOpen, setIsOpen] = useState(false);
	const [filteredData, setFilteredData] = useState(data);

	// Debounced Query Handler
	const handleQuerySearch = useCallback(
		debounce((value) => {
			if (!value.trim()) {
				setFilteredData(data); // Reset if query is empty
				return;
			}
			console.log('search data', data);
			const filtered = data.filter((item) =>
				item.name.toLowerCase().includes(value.toLowerCase())
			);
			setFilteredData(filtered);
		}, 500), // 500ms debounce time
		[data]
	);

	const handleInputChange = (e) => {
		const value = e.target.value;
		setQuery(value);
		handleQuerySearch(value); // Trigger debounced search
	};

	useEffect(() => {
		// Clean up the debounce function on unmount
		return () => {
			handleQuerySearch.cancel && handleQuerySearch.cancel();
		};
	}, [handleQuerySearch]);

	const handleSelectItem = (item) => {
		// console.log('item', item);
		setSelectItem(item);
		setQuery(item.name);
		setIsOpen(false);
	};
	const handleBlur = () => {
		setTimeout(() => {
			setIsOpen(false);
		}, 200);
	};

	return (
		<div className="relative">
			<input
				value={query}
				onChange={handleInputChange}
				onFocus={() => setIsOpen(true)}
				onBlur={handleBlur}
				placeholder={selectItem.name}
				className="w-full rounded-md border p-2 shadow-md"
			/>
			{isOpen && (
				<div
					name="status"
					aria-label="Project status"
					className="absolute right-0 z-10 w-full mt-1 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
				>
					<div className="flex flex-col justify-start ">
						{filteredData?.map((item) => {
							// console.log('item', item);
							return (
								<button
									key={item.id}
									value={item.id}
									onClick={() => handleSelectItem(item)}
									className="py-2 p-2 hover:bg-gray-100 cursor-pointer text-left"
								>
									{item.name}
								</button>
							);
						})}
					</div>
				</div>
			)}
		</div>
	);
}

// Utility function: Debounce

export default SelectField;

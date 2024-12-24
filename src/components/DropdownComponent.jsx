/* eslint-disable react/prop-types */
import { useState, useEffect, useCallback } from 'react';
import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';

function debounce(fn, delay) {
	let timeoutId;
	const debounced = (...args) => {
		clearTimeout(timeoutId);
		timeoutId = setTimeout(() => fn(...args), delay);
	};
	debounced.cancel = () => clearTimeout(timeoutId); // Optional: Add cancel method
	return debounced;
}
function classNames(...classes) {
	return classes.filter(Boolean).join(' ');
}

function DropdownComponent({ data, setSelectItem, selectItem }) {
	const [query, setQuery] = useState('');
	const [filteredData, setFilteredData] = useState(data);

	// Debounced Query Handler
	const handleQuerySearch = useCallback(
		debounce((value) => {
			if (!value.trim()) {
				setFilteredData(data); // Reset if query is empty
				return;
			}
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

	return (
		<Menu as="div" className="relative inline-block text-left">
			<div className='relative flex'>
				<input
					value={query}
					onChange={handleInputChange}
					placeholder="Search..."
					className="w-full rounded-md border p-2 shadow-md"
				/>
				<Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
					Options
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="w-5 h-5 ml-2 -mr-1"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						strokeWidth={2}
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M19 9l-7 7-7-7"
						/>
					</svg>
				</Menu.Button>
			</div>

			<Transition
				as={Fragment}
				enter="transition ease-out duration-100"
				enterFrom="transform opacity-0 scale-95"
				enterTo="transform opacity-100 scale-100"
				leave="transition ease-in duration-75"
				leaveFrom="transform opacity-100 scale-100"
				leaveTo="transform opacity-0 scale-95"
			>
				<Menu.Items className="absolute debug right-0 w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
					<div className="py-1 debug">
						{filteredData?.map((item) => (
							<Menu.Item key={item.id} className="cursor-pointer py-10 debug">
								{({ active }) => (
									<div
										className={classNames(
											active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
											'block px-4 py-2 text-sm'
										)}
									>
										{item.name}
									</div>
								)}
							</Menu.Item>
						))}
					</div>
				</Menu.Items>
			</Transition>
		</Menu>
	);
}

export default DropdownComponent;

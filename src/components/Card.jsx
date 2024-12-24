// import React from 'react';

function Card() {
	return (
		<div className="flex justify-center py-10">
			<div className=" rounded-xl bg-white text-left align-middle shadow-xl transition-all font-josefin min-w-[400px] max-w-xl mx-auto">
				<div className="space-y-5 p-4">
					<div className="flex text-center border-b w-full">
						<div className="text-center border p-2 w-full">
							<h2 className="font-bold text-lg">Balance</h2>
							<h3>00.00</h3>
						</div>
						<div className="text-center border p-2 w-full">
							<h2 className="font-bold text-lg">Rewards</h2>
							<h3>00.00</h3>
						</div>
					</div>
					<div className="flex"></div>
				</div>
			</div>
		</div>
	);
}

export default Card;

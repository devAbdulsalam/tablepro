const Tweets = () => {
	const data = [
		{ id: '2a60eaa0-fb2a-4890-b201-ad051605ebeb', tweet: 'Random Tweet 1' },
		{ id: 'dc23d437-5322-4a52-b90f-a6911c5c9ac0', tweet: 'Random Tweet 2' },
		{ id: 'b4d500d3-d5a4-4e02-8a27-87b91860ba35', tweet: 'Random Tweet 3' },
		{ id: 'a712f8de-fa03-414a-b7b3-5df3ca69e23a', tweet: 'Random Tweet 4' },
		{ id: 'ca2f8826-2849-4423-b063-881b935a87d4', tweet: 'Random Tweet 5' },
		{ id: '52c97d3f-ea01-4daf-bfc6-4c573a2cde54', tweet: 'Random Tweet 6' },
		{ id: 'a0360996-5ee6-47c6-9ae3-244a7f891c8c', tweet: 'Random Tweet 7' },
		{ id: '85a17acf-d9e3-4e20-be3e-bdd0d9635cac', tweet: 'Random Tweet 8' },
		{ id: '36878dd7-d6ab-42bc-9a42-e7face02931e', tweet: 'Random Tweet 9' },
		{ id: '285aa071-39f2-4113-8d32-1292cbe44abe', tweet: 'Random Tweet 10' },
		{ id: '7c6f19c3-3dfb-49c7-a93d-27ea4a685bde', tweet: 'Random Tweet 11' },
		{ id: '3756841d-60fc-4c28-b162-c76a6971f5e1', tweet: 'Random Tweet 12' },
		{ id: '631bc99a-e5bc-458c-98ab-bca7b7f1bd7d', tweet: 'Random Tweet 13' },
		{ id: 'abb6c9d6-27a3-49c1-a9c9-158a1a8d510a', tweet: 'Random Tweet 14' },
		{ id: '42514b09-6743-43f2-bfaf-c3ba127b3383', tweet: 'Random Tweet 15' },
		{ id: '967701ae-8373-4c03-8159-4bec40da8692', tweet: 'Random Tweet 16' },
		{ id: '2d819900-9d63-4d1d-9878-d0bce1a1a432', tweet: 'Random Tweet 17' },
		{ id: 'ed45b7cc-102d-4b51-8ab3-6337e96254fe', tweet: 'Random Tweet 18' },
		{ id: 'fc709242-e9e5-417d-9096-6b91dc73fc61', tweet: 'Random Tweet 19' },
		{ id: 'dfd9d6a3-88b8-4548-8e1e-b5f847cab05b', tweet: 'Random Tweet 20' },
	];

	return (
		<div className="py-4 flex justify-center">
			<div>
				{data.map((item) => (
					<div key={item.id} className="p-1">
						{item.tweet}
					</div>
				))}
			</div>
		</div>
	);
};

export default Tweets;

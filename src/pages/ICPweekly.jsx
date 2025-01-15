/* eslint-disable react/prop-types */
const Subscribe = () => (
	<div className="container mx-auto py-10 text-center">
		<h1 className="text-2xl font-bold">Subscribe to ICPWeekly</h1>
		<p className="mt-4 text-gray-600">
			Stay updated with the latest from the ICP ecosystem!
		</p>
		<form className="mt-6">
			<input
				type="email"
				placeholder="Enter your email"
				className="border p-2 rounded-lg w-1/3"
			/>
			<button
				type="submit"
				className="ml-4 bg-blue-600 text-white px-4 py-2 rounded-lg"
			>
				Subscribe
			</button>
		</form>
	</div>
);

const Card = ({ title, description, link }) => (
	<div className="border rounded-lg p-4 bg-white shadow-md">
		<h3 className="text-xl font-bold">{title}</h3>
		<p className="mt-2 text-gray-600">{description}</p>
		<a href={link} className="mt-4 text-blue-500 hover:underline block">
			Learn more
		</a>
	</div>
);

const Home = () => {
	const resources = [
		{ title: 'Tweet 1', description: 'Interesting ICP tweet', link: '#' },
		{ title: 'Event', description: 'Upcoming ICP event', link: '#' },
		{ title: 'Resource', description: 'Learn about ICP', link: '#' },
	];

	return (
		<div>
			<nav className="bg-blue-600 text-white px-4 py-2">
				<div className="container mx-auto flex justify-between">
					<h1 className="text-lg font-bold">ICPWeekly</h1>
					<ul className="flex space-x-4">
						<li>
							<a href="/" className="hover:underline">
								Home
							</a>
						</li>
						<li>
							<a href="/" className="hover:underline">
								Subscribe
							</a>
						</li>
					</ul>
				</div>
			</nav>
			<div className="bg-gray-100 py-10 text-center">
				<h1 className="text-3xl font-bold">Welcome to ICPWeekly</h1>
				<p className="mt-4 text-gray-600">
					Your go-to platform for all things ICP: tweets, updates, events, and
					resources.
				</p>
			</div>
			<Subscribe />
			<div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
				{resources.map((res, index) => (
					<Card key={index} {...res} />
				))}
			</div>
		</div>
	);
};

export default Home;



import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import MsWord from './pages/MsWord.jsx';
import Loader from './components/Loader.jsx';
import Index from './pages/Index.jsx';
import Chat from './pages/Chat.jsx';
import NotFound from './NotFound.jsx';
import Layout from './layouts/Layout.jsx';
import fetchData from './apis/index.js';
function App() {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState(null);
	useEffect(() => {
		const fetch = async () => {
			const response = await fetchData();
			console.log(response);
			setLoading(false);
		};

		fetch();
	}, []);

	return loading ? (
		<Loader />
	) : (
		<>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route path="/" element={<Index />} />
					<Route path="/ms-word" element={<MsWord />} />
					<Route path="/chat" element={<Chat />} />
					<Route path="/*" element={<NotFound />} />
				</Route>
			</Routes>
		</>
	);
}

export default App;

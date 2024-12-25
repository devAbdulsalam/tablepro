import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import MsWord from './pages/MsWord.jsx';
import Loader from './components/Loader.jsx';
import Index from './pages/Index.jsx';
import Home from './pages/Home.jsx';
import Chat from './pages/Chat.jsx';
import NotFound from './NotFound.jsx';
import Layout from './layouts/Layout.jsx';
import fetchData from './apis/index.js';
import AOS from 'aos';
import 'aos/dist/aos.css';
function App() {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState(null);
	useEffect(() => {
		AOS.init({
			duration: 1000, // Global animation duration
			once: true, // Only once animation
		});
	}, []);
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
					<Route path="/" element={<Home />} />
					<Route path="/ms-word" element={<MsWord />} />
					<Route path="/chat" element={<Chat />} />
					<Route path="/*" element={<NotFound />} />
				</Route>
			</Routes>
		</>
	);
}

export default App;

// motokion
// mjjyq-5yaaa-aaaag-atsnq-cai

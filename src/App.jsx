import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import MsWord from './pages/MsWord.jsx';
import Loader from './components/Loader.jsx';
import Index from './pages/Index.jsx';
import Quiz from './pages/Quiz.jsx';
import Chat from './pages/Chat.jsx';
import NotFound from './NotFound.jsx';
import Layout from './layouts/Layout.jsx';
// import Home from './pages/Home.jsx';
// import ICPweekly from './pages/ICPweekly.jsx';
// import fetchData from './apis/index.js';
import AOS from 'aos';
import 'aos/dist/aos.css';
function App() {
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		AOS.init({
			duration: 1000, // Global animation duration
			once: true, // Only once animation
		});
	}, []);

	useEffect(() => {
		const timer = setTimeout(() => {
			setLoading(false);
		}, 3000);
		return () => clearTimeout(timer);
	}, []);

	return loading ? (
		<Loader />
	) : (
		<>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route path="/" element={<Index />} />
					{/* <Route path="/quiz" element={<Quiz />} />
					<Route path="/ms-word" element={<MsWord />} />
					<Route path="/chat" element={<Chat />} /> */}
					<Route path="/*" element={<NotFound />} />
				</Route>
			</Routes>
		</>
	);
}

export default App;

// motokion
// mjjyq-5yaaa-aaaag-atsnq-cai

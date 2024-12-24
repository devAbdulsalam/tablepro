import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar.jsx';
import Footer from '../components/Footer.jsx';
const Layout = () => {
	return (
		<div className="bg-gray-100">
			<NavBar />
			<Outlet />
			<div className="bg-gray-600">
				<Footer />
			</div>
		</div>
	);
};

export default Layout;

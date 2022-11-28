import Sidebar from '../../components/Sidebar';
import { Navigate, Outlet } from 'react-router-dom';
import './styles.scss';
import DashboardNavbar from 'components/DashboardNavbar';

const DashboardLayout = () => {
	const URLshortenerUser = window.localStorage.getItem('URLshortenerUser');
	const isAuth = URLshortenerUser && JSON.parse(URLshortenerUser) ? true : false;

	if (!isAuth) {
		return <Navigate to="/login" replace />;
	}

	return (
		<div>
			<div className="flex" style={{ display: 'flex', height: '100%' }}>
				<Sidebar />
				<div className="main" style={{ width: '100%' }}>
					<DashboardNavbar isDashboard={true} />
          <div className="inner-dashboard">
					  <Outlet />
          </div>
				</div>
			</div>
		</div>
	);
};

export default DashboardLayout;

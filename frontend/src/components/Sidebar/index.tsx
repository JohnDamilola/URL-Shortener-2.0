import './styles.scss';
import { Sidebar as ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';

const Sidebar = ({ isDashboard }: any) => {
	const handleLogout = () => {
		window.localStorage.removeItem('URLshortenerUser');
		window.location.replace('/');
	};
	return (
		<ProSidebar className="dashboard-sidebar">
			<Menu>
				<Link className="navbar-brand" to="/">
					<img className="img-fluids" src={require('assets/images/logo.png')} />
				</Link>
				<div className="spacebar" />
				<MenuItem active>
					<i className="lni lni-dashboard"></i> Overview{' '}
				</MenuItem>
				<MenuItem>
					<i className="lni lni-unlink"></i> Links{' '}
				</MenuItem>
				<MenuItem>
					<i className="lni lni-pie-chart"></i> Analytics{' '}
				</MenuItem>
				<MenuItem>
					<i className="lni lni-cog"></i> Account Settings{' '}
				</MenuItem>
			</Menu>
		</ProSidebar>
	);
};

export default Sidebar;

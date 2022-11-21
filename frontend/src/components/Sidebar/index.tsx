import './styles.scss';
import { Sidebar as ProSidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import { useProSidebar } from 'react-pro-sidebar';

const Sidebar = ({ isDashboard }: any) => {
	const handleLogout = () => {
		window.localStorage.removeItem('URLshortenerUser');
		window.location.replace('/');

	};

  const { collapsed } = useProSidebar();


	return (
		<ProSidebar className="dashboard-sidebar">
			<Menu>
				<Link className="navbar-brand" to="/">
          {
            collapsed ? <img className="img-fluids logo-small" src={require('assets/images/logo-small.png')} /> :
            <img className="img-fluids logo-big" src={require('assets/images/logo.png')} />
          }
				</Link>
				<div className="spacebar" />
				<MenuItem routerLink={<Link to="/overview" />} active icon={<i className="lni lni-dashboard"></i> }>
					Overview
				</MenuItem>
				<MenuItem routerLink={<Link to="/links" />} icon={<i className="lni lni-unlink"></i>}>
					Links
				</MenuItem>
				<MenuItem routerLink={<Link to="/analytics" />} icon={<i className="lni lni-pie-chart"></i>}>
					Analytics
				</MenuItem>
				<MenuItem routerLink={<Link to="/settings" />} icon={<i className="lni lni-cog"></i>}>
					Account Settings
				</MenuItem>
			</Menu>
		</ProSidebar>
	);
};

export default Sidebar;

import './styles.scss';
import { Sidebar as ProSidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link, useLocation } from 'react-router-dom';
import { useProSidebar } from 'react-pro-sidebar';

const Sidebar = ({ isDashboard }: any) => {
  const location = useLocation()
	const handleLogout = () => {
		window.localStorage.removeItem('URLshortenerUser');
		window.location.replace('/');

	};

  const { collapsed } = useProSidebar();

  const isActivePath = (path: string) => location.pathname.includes(path)

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
				<MenuItem routerLink={<Link to="/overview" />} active={isActivePath('/overview')} icon={<i className="fa-solid fa-gauge"></i> }>
					Overview
				</MenuItem>
				<MenuItem routerLink={<Link to="/links" />} active={isActivePath('/links')} icon={<i className="fa-solid fa-link"></i>}>
					Links
				</MenuItem>
				<MenuItem routerLink={<Link to="/analytics" />} active={isActivePath('/analytics')} icon={<i className="fa-solid fa-chart-simple"></i>}>
					Analytics
				</MenuItem>
				<MenuItem routerLink={<Link to="/account-settings" />} active={isActivePath('/account-settings')} icon={<i className="fa-solid fa-gear"></i>}>
					Account Settings
				</MenuItem>
			</Menu>
		</ProSidebar>
	);
};

export default Sidebar;

import './styles.scss';
import { useProSidebar } from 'react-pro-sidebar';

const DashboardNavbar = ({ isDashboard }: any) => {
	const { collapseSidebar } = useProSidebar();

	const handleLogout = () => {
		window.localStorage.removeItem('URLshortenerUser');
		window.location.replace('/');
	};
	return (
		<nav className="navbar dashboard-navbar navbar-expand-lg sticky-top">
      <button className='collapse-btn' onClick={() => collapseSidebar()}>
        <i className="fa-solid fa-angle-left"></i>
      </button>
			<div className="container">
				<div className="collapse navbar-collapse" id="navbarNavAltMarkup">
					<div className="navbar-nav ml-auto navbar-centers gap-4">
						<li
							className="nav-item"
							onClick={handleLogout}
							style={{ cursor: 'pointer', fontWeight: '600' }}
						>
							<i className="lni lni-cross-circle mr-2" style={{ fontWeight: '600' }}></i> Logout
						</li>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default DashboardNavbar;

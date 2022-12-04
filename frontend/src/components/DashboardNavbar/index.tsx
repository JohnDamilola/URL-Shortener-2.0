import './styles.scss';
import { useProSidebar } from 'react-pro-sidebar';
import { Dropdown, Menu, Space } from 'antd';
import { Link } from 'react-router-dom';


const DashboardNavbar = ({ isDashboard }: any) => {
	const { collapseSidebar } = useProSidebar();

	const handleLogout = () => {
		window.localStorage.removeItem('URLshortenerUser');
		window.location.replace('/');
	};

  const menu = (
    <Menu
    style={{marginTop: '10px'}}
      items={[
        {
          key: '1',
          label: (
            <Link to='/account-settings'>
              <i className="fa-solid fa-user-pen mr-2"></i> Edit Profile
            </Link>
          ),
        },
        {
          key: '3',
          danger: true,
          label: (
            <span onClick={handleLogout}>
              <i className="fa-solid fa-power-off mr-2"></i> Logout
            </span>
          ),
        },
      ]}
    />
  );

  const URLshortenerUser = window.localStorage.getItem('URLshortenerUser');
	let user_id = (URLshortenerUser && JSON.parse(URLshortenerUser).id) || {};
	let first_name = (URLshortenerUser && JSON.parse(URLshortenerUser).first_name) || {};
  let last_name = (URLshortenerUser && JSON.parse(URLshortenerUser).last_name) || {};

	return (
		<nav className="navbar dashboard-navbar navbar-expand-lg sticky-top">
			<button className="collapse-btn" onClick={() => collapseSidebar()}>
				<i className="fa-solid fa-angle-left"></i>
			</button>
			<div className="container">
				<div className="collapse navbar-collapse" id="navbarNavAltMarkup">
					<div className="navbar-nav ml-auto navbar-centers gap-4">
						<li
							className="nav-item"
							style={{ cursor: 'pointer', fontWeight: '600' }}
						>
							<Dropdown overlay={menu} trigger={['click']}>
								<a onClick={(e) => e.preventDefault()} style={{color: '#000'}}>
									<Space>
										<i className="fa-solid fa-user"></i>
										{first_name}
										<i className="fa-solid fa-caret-down"></i>
									</Space>
								</a>
							</Dropdown>
						</li>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default DashboardNavbar;

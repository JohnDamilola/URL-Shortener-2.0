import { Table } from 'antd';
import './styles.scss';

const stats = [
	{
		title: 'Total Links',
		value: 12,
    icon: <i className="fa-solid fa-lines-leaning"></i>
	},
	{
		title: 'Enabled Links',
		value: 10,
    icon: <i className="fa-solid fa-link"></i>
	},
	{
		title: 'Disabled Links',
		value: 2,
    icon: <i className="fa-solid fa-link-slash"></i>
	},
	{
		title: 'Link Visits',
		value: 120,
    icon: <i className="fa-solid fa-eye"></i>
	},
];

const dataSource = [
	{
		key: '1',
		title: 'Members Database',
		longURL: 'https://tropical-ice-7c3.notion.site/b2576539b0354b6dbe930523ed26f405?v=d40dfd1c847142b2b6f73b8bc70b487c',
		shortURL: 'bit.ly/BTHMembersDatabase',
    status: 'active'
	},
	{
		key: '2',
		title: 'Members Database',
		longURL: 'https://tropical-ice-7c3.notion.site/b2576539b0354b6dbe930523ed26f405?v=d40dfd1c847142b2b6f73b8bc70b487c',
		shortURL: 'bit.ly/BTHMembersDatabase',
    status: 'inactive'
	},
  {
		key: '3',
		title: 'Members Database',
		longURL: 'https://tropical-ice-7c3.notion.site/b2576539b0354b6dbe930523ed26f405?v=d40dfd1c847142b2b6f73b8bc70b487c',
		shortURL: 'bit.ly/BTHMembersDatabase',
    status: 'active'
	},
  {
		key: '4',
		title: 'Members Database',
		longURL: 'https://tropical-ice-7c3.notion.site/b2576539b0354b6dbe930523ed26f405?v=d40dfd1c847142b2b6f73b8bc70b487c',
		shortURL: 'bit.ly/BTHMembersDatabase',
    status: 'inactive'
	},
  {
		key: '5',
		title: 'Members Database',
		longURL: 'https://tropical-ice-7c3.notion.site/b2576539b0354b6dbe930523ed26f405?v=d40dfd1c847142b2b6f73b8bc70b487c',
		shortURL: 'bit.ly/BTHMembersDatabase',
    status: 'active'
	},
];

const columns = [
  // {
	// 	title: 'S/N',
	// 	dataIndex: 'key',
	// 	key: 'key',
  //   width: '100px'
	// },
	{
		title: 'Title',
		dataIndex: 'title',
		key: 'title',
    // width: '250px',
    render: (item: any) => (
      <h6 className="m-0">{item}</h6>
    )
	},
	{
		title: 'Long URL',
		dataIndex: 'longURL',
		key: 'longURL',
    // width: '300px',
    ellipsis: true
	},
	{
		title: 'Short URL',
		dataIndex: 'shortURL',
		key: 'shortURL',
    // width: '300px',
	},
  {
		title: 'Status',
		dataIndex: 'status',
		key: 'status',
	},
  {
		title: 'Action',
		key: 'action',
    // align: 'right',
    width: '150px',
    render: () => (
      <div className='d-flex gap-2 justify-content-end'>
        <i className="lni lni-pencil-alt"></i>
        <i className="lni lni-trash-can"></i>
      </div>
    )
	},
];


const Dashboard = () => {
	return (
		<div className="dashboard-page dashboard-commons">
			<section>
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<div className="flex justify-between items-center">
								<div className="welcome-pane">
									<h3>
										<b>Hey John, Welcome Back!</b> 👋
									</h3>
									<p className="">Here's your dashboard stats as at today</p>
								</div>
							</div>
						</div>
					</div>

					<div className="row">
						{stats.map(({ title, value, icon }, index) => {
							return (
								<div className="col-md-3">
									<div className="stats-card" key={index}>
										<p className="text-sm text-white mb-4 font-semibold flex items-center gap-2">
											{title}
										</p>
										<div className="flex items-center justify-between">
											<div className="d-flex gap-2 flex-row align-items-center">
                        {icon}
												<h3>{value}</h3>
											</div>
										</div>
									</div>
								</div>
							);
						})}
					</div>

					<div className="row table-pane">
						<div className="col-md-12">
							<Table dataSource={dataSource} columns={columns} />;
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default Dashboard;

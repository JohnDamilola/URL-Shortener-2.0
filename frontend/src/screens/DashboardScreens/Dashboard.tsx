import './styles.scss';

const stats = [
	{
		title: 'Total Links',
		value: 12,
	},
	{
		title: 'Enabled Links',
		value: 10,
	},
	{
		title: 'Disabled Links',
		value: 2,
	},
	{
		title: 'Link Visits',
		value: 120,
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
									<p className="">
										Here's your dashboard stats as at today
									</p>
								</div>
							</div>
						</div>
					</div>
					<div className="row">
						{stats.map(({ title, value }, index) => {
							return (
								<div className="col-md-3">
									<div className="stats-card" key={index}>
										<p className="text-sm text-white mb-4 font-semibold flex items-center gap-2">
											{title}
										</p>
										<div className="flex items-center justify-between">
											<div className="flex gap-2 flex-row items-center">
												{/* {'icon'} */}
												<h3>{value}</h3>
											</div>
										</div>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</section>
		</div>
	);
};

export default Dashboard;

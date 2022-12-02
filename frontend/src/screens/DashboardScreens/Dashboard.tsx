import { Drawer, Table } from 'antd';
import { useEffect, useState } from 'react';
import './styles.scss';
import Swal from "sweetalert2";
import http from "utils/api";




const stats = [
	{
		title: 'Total Links',
		value: 12,
		icon: <i className="fa-solid fa-lines-leaning"></i>,
	},
	{
		title: 'Enabled Links',
		value: 10,
		icon: <i className="fa-solid fa-link"></i>,
	},
	{
		title: 'Disabled Links',
		value: 2,
		icon: <i className="fa-solid fa-link-slash"></i>,
	},
	{
		title: 'Link Visits',
		value: 120,
		icon: <i className="fa-solid fa-eye"></i>,
	},
];

const urll = 
	{
		stub: 'stub',
		long_url: 'https://github.com/JohnDamilola/URL-Shortener-2.0/issues/26',
		disabled: true,
		password_hash: '123',
		expire_on: '2022-05-10'
	};
let dateTime = new Date()
export const isDisabled = urll.disabled;
export const isExpired = new Date(urll.expire_on) < dateTime;
const fetchURL = async () => {
	// const [fetchingURL, setFetchingURL] = useState(false);
	// const [url, setURL] = useState<URL>();
	// setFetchingURL(true);
	const params = "";
	await http
		// .get("/links/stub", {
		// params,
		// })
		.get("")
		.then((res) => {
		const {url} = res.data || {};
		
		
		if(isDisabled == false && urll.password_hash == "" && !isExpired){
        	window.location.assign(urll.long_url);
		}
		if(isDisabled == true || isExpired){
			window.location.assign("/dsfasdfasdf");
		}
		if(urll.password_hash != ""){
			Swal.fire({
				title: 'Enter password for authetication',
				input: 'text',
				inputAttributes: {
				  autocapitalize: 'off'
				},
				showCancelButton: true,
				confirmButtonText: 'Submit',
				showLoaderOnConfirm: true,
				preConfirm: (password) => {
					if(password == urll.password_hash){
						window.location.assign(urll.long_url);
					}
					else{
						Swal.showValidationMessage(
							`Incorect password. Request failed!`
						  )
					}
				},
			})
		}
		})
		.catch((err) => {
			Swal.fire({
				icon: 'error',
				title: 'URL Redirect Failed!',
				text: 'An error occurred, please try again',
				confirmButtonColor: '#221daf',
			  })
		});
};

const Dashboard = () => {
	const [openedLink, setOpenedLink] = useState<number | null>(null);

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
						{[1, 2, 3, 4, 5].map(() => {
							return (
								<div className="col-md-12">
									<LinkCardItem setOpenedLink={setOpenedLink} />
								</div>
							);
						})}
					</div>
				</div>
			</section>
			<ViewDrawer openedLink={openedLink} setOpenedLink={setOpenedLink} />
		</div>
	);
};

export default Dashboard;

const ViewDrawer = ({ openedLink, setOpenedLink }: any) => {
	return (
		<Drawer title="Basic Drawer" placement="right" onClose={() => setOpenedLink(null)} open={openedLink}>
			<p>Some contents...</p>
			<p>Some contents...</p>
			<p>Some contents...</p>
		</Drawer>
	);
};

const LinkCardItem = ({ setOpenedLink }: any) => {
	return (
		<div className="link-card">
			<div className="d-flex justify-content-between">
        <div className='col-lg-10'>
				  <h5>ATH Members Database</h5>
        </div>
        <div className='col-lg-2'>
          <p className="time-text">
            <i className="fa-solid fa-clock"></i> 2 hrs ago
          </p>
        </div>
			</div>
			<div className="url-pane">
				<p>bit.ly/ATHMembers02</p>
				<i className="fa-solid fa-copy"></i>
			</div>
			<p style={{overflowWrap: 'break-word'}}>
				<b>Original URL:</b>{' '}
				https://tropical-ice-7c3.notion.site/b2576539b0354b6dbe930523ed26f405?v=d40dfd1c847142b2b6f73b8bc70b487cqwqeeq
			</p>
			<div className="btn-pane">
				<button className="btn btn-outline-dark" onClick={setOpenedLink}>
          <i className="fa-solid fa-eye"></i> View
				</button>
        <button className="btn btn-outline-dark">
					<i className="fa-solid fa-share"></i> Share
				</button>
				<button className="btn btn-outline-primary">
					<i className="fa-solid fa-pen-to-square"></i> Edit
				</button>
				<button className="btn btn-outline-primary" onClick={() => fetchURL()}>
					<i className="fa-solid fa-pen-to-square"></i> Redirect
				</button>
				<button className="btn btn-outline-danger">
					<i className="fa-solid fa-trash"></i> Delete
				</button>
			</div>
		</div>
	);
};


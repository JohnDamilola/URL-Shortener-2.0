import { Drawer, Table } from 'antd';
import { useState } from 'react';
import Swal from 'sweetalert2';
import http from 'utils/api';
import './styles.scss';
const URLshortenerUser  = window.localStorage.getItem("URLshortenerUser");
var user_id = (URLshortenerUser && JSON.parse(URLshortenerUser).id) || {};
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
			<EditDrawer openedLink={openedLink} setOpenedLink={setOpenedLink} />
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


const EditDrawer = ({ openedLink, setOpenedLink }: any) => {
	const [title, setTitle] = useState('');
	const [stub, setStub] = useState('');
	const [long_url, setLongURL] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);
	const handleUpdateLink = async(e: any) =>{
		e.preventDefault();
		const payload = {
			title,
			stub,
			long_url
		};
	
		await http
		//   .patch(`/links/update/${id}?user_id=${user_id}`, payload)
			.patch(`/links/update/be70a7ee-a918-4162-895e-5618b9fca387?user_id=${user_id}`, payload)
			.then((res) => {
			const { id } = res.data;
			Swal.fire({
				icon: 'success',
				title: 'Link Updated Successfully!',
				text: 'You have successfully updated a link',
				confirmButtonColor: '#221daf',
			}).then(() => {
				window.location.replace(``);
			})
			})
			.catch((err) => {
			Swal.fire({
				icon: 'error',
				title: 'Link Update Failed!',
				text: 'An error occurred, please try again',
				confirmButtonColor: '#221daf',
			})
			});
	}
	return (
		<Drawer title="Edit URL" placement="right" onClose={() => setOpenedLink(null)} open={openedLink}>
			<div className="row justify-content-center mt-2">
                  <form className="col-md-12" onSubmit={handleUpdateLink}>
                    <div className="form-group">
                      <label><h5>Title</h5></label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Title"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label><h5>Stub</h5></label>
                      <textarea
                        className="form-control"
                        onChange={(e) => setStub(e.target.value)}
                        placeholder="URL-Shortener"
                        required
                      />
                    </div>
					<div className="form-group">
                      <label><h5>New URL</h5></label>
                      <textarea
                        className="form-control"
                        onChange={(e) => setLongURL(e.target.value)}
                        placeholder="https://github.com/JohnDamilola/URL-Shortener-2.0"
                        required
                      />
					  <button className="btn btn-outline-primary col-md-6" type='submit'>
                        <span className="">{isSubmitting ? 'Submitting...' : 'Submit'}</span>
                      </button>
                    </div>
             	</form>
			</div>
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
				<button className="btn btn-outline-primary" onClick={setOpenedLink}>
					<i className="fa-solid fa-pen-to-square"></i> Edit
				</button>
				<button className="btn btn-outline-danger">
					<i className="fa-solid fa-trash"></i> Delete
				</button>
			</div>
		</div>
	);
};

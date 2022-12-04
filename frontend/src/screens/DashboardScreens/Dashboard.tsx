import Swal from 'sweetalert2';
import { Button, Collapse, DatePicker, Drawer, Input, Popconfirm, Space, Switch } from 'antd';
import { useEffect, useState } from 'react';
import http from 'utils/api';
import moment from 'moment';
import { QuestionCircleOutlined } from '@ant-design/icons';
import './styles.scss';
import toast, { Toaster } from 'react-hot-toast';

export var isDisabled: boolean;
export var isExpired: any;

const { Panel } = Collapse;

const Dashboard = () => {
	const [openedLink, setOpenedLink] = useState<number | null>(null);
	const [openedCreateLink, setOpenedCreateLink] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState(false);
	const [statsData, setStatsData] = useState<any>(null);
	const [linksData, setLinksData] = useState<any[]>([]);

	const URLshortenerUser = window.localStorage.getItem('URLshortenerUser');
	let user_id = (URLshortenerUser && JSON.parse(URLshortenerUser).id) || {};
	let first_name = (URLshortenerUser && JSON.parse(URLshortenerUser).first_name) || {};

	useEffect(() => {
		fetchStats();
		fetchAllLinks();
	}, []);

	const fetchStats = async () => {
		setIsLoading(true);

		await http
			.get(`/links/stats?user_id=${user_id}`)
			.then((res) => {
				const { links } = res.data;
				setIsLoading(false);
				setStatsData(links);
			})
			.catch((err) => {
				setIsLoading(false);
			});
	};

	const fetchAllLinks = async () => {
		setIsLoading(true);

		await http
			.get(`/links/all?user_id=${user_id}`)
			.then((res) => {
				const { links } = res.data;
				setIsLoading(false);
				setLinksData(links);
			})
			.catch((err) => {
				setIsLoading(false);
			});
	};

	const { total_count, total_disabled, total_enabled, total_engagements } = statsData || {};

	const stats = [
		{
			title: 'Total Links',
			value: total_count || 0,
			icon: <i className="fa-solid fa-lines-leaning"></i>,
		},
		{
			title: 'Enabled Links',
			value: total_enabled || 0,
			icon: <i className="fa-solid fa-link"></i>,
		},
		{
			title: 'Disabled Links',
			value: total_disabled || 0,
			icon: <i className="fa-solid fa-link-slash"></i>,
		},
		{
			title: 'Link Visits',
			value: total_engagements || 0,
			icon: <i className="fa-solid fa-eye"></i>,
		},
	];

	return (
		<div className="dashboard-page dashboard-commons">
			<section>
      <Toaster/>
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<div className="d-flex justify-content-between items-center">
								<div className="welcome-pane">
									<h3>
										<b>Hey {first_name || ''}, Welcome Back!</b> 👋
									</h3>
									<p className="">Here's your dashboard stats as at today</p>
								</div>
								<button className="btn btn-main" onClick={() => setOpenedCreateLink(true)}>
									Shorten Link
								</button>
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
						{linksData
							.sort(function (a: any, b: any) {
								return moment(b.created_on).diff(moment(a.created_on));
							})
							.map((item: any, index: number) => {
								return (
									<div className="col-md-12">
										<LinkCardItem setOpenedLink={setOpenedLink} item={item} />
									</div>
								);
							})}
					</div>
				</div>
			</section>
			<ViewDrawer openedLink={openedLink} setOpenedLink={setOpenedLink} />
			<EditDrawer openedLink={openedLink} setOpenedLink={setOpenedLink} />
			<CreateLinkDrawer openedCreateLink={openedCreateLink} setOpenedCreateLink={setOpenedCreateLink} />
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

	const URLshortenerUser = window.localStorage.getItem('URLshortenerUser');
	let user_id = (URLshortenerUser && JSON.parse(URLshortenerUser).id) || {};

	const handleUpdateLink = async (e: any) => {
		e.preventDefault();
		const payload = {
			title,
			stub,
			long_url,
		};

		await http
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
				});
			})
			.catch((err) => {
				Swal.fire({
					icon: 'error',
					title: 'Link Update Failed!',
					text: 'An error occurred, please try again',
					confirmButtonColor: '#221daf',
				});
			});
	};
	return (
		<Drawer title="Edit URL" placement="right" onClose={() => setOpenedLink(null)} open={openedLink}>
			<div className="row justify-content-center mt-2">
				<form className="col-md-12" onSubmit={handleUpdateLink}>
					<div className="form-group">
						<label>
							<h5>Title</h5>
						</label>
						<input
							type="text"
							className="form-control"
							onChange={(e) => setTitle(e.target.value)}
							placeholder="Title"
							required
						/>
					</div>
					<div className="form-group">
						<label>
							<h5>Stub</h5>
						</label>
						<textarea
							className="form-control"
							onChange={(e) => setStub(e.target.value)}
							placeholder="URL-Shortener"
							required
						/>
					</div>
					<div className="form-group">
						<label>
							<h5>New URL</h5>
						</label>
						<textarea
							className="form-control"
							onChange={(e) => setLongURL(e.target.value)}
							placeholder="https://github.com/JohnDamilola/URL-Shortener-2.0"
							required
						/>
						<button className="btn btn-outline-primary col-md-6" type="submit">
							<span className="">{isSubmitting ? 'Submitting...' : 'Submit'}</span>
						</button>
					</div>
				</form>
			</div>
		</Drawer>
	);
};

const CreateLinkDrawer = ({ openedCreateLink, setOpenedCreateLink }: any) => {
	const URLshortenerUser = window.localStorage.getItem('URLshortenerUser');
	let user_id = (URLshortenerUser && JSON.parse(URLshortenerUser).id) || {};
	const [isLoading, setIsLoading] = useState(false);
	const [payload, setPayload] = useState<any>({
		created_on: null,
		disabled: false,
		expire_on: null,
		long_url: null,
		stub: null,
		title: null,
		updated_on: null,
		user_id,
		utm_campaign: null,
		utm_content: null,
		utm_medium: null,
		utm_source: null,
		utm_term: null,
	});

	const handleChange = (propertyName: string, e: any) => {
		const _payload = { ...payload };
		_payload[propertyName] = e.target.value;
		setPayload(_payload);
	};

	const handleDateChange = (value: any, dateString: any) => {
		const _payload = { ...payload };
		_payload['expire_on'] = value;
		setPayload(_payload);
	};

	const handleSwitchChange = (checked: boolean) => {
		const _payload = { ...payload };
		_payload['disabled'] = !checked;
		setPayload(_payload);
	};

	const handleSubmit = async () => {
		setIsLoading(true);
		// console.log(payload);
		await http
			.post(`/links/create?user_id=${user_id}`, payload)
			.then((res) => {
				Swal.fire({
					icon: 'success',
					title: 'Link Created Successfully!',
					text: 'You have successfully created a short link',
					confirmButtonColor: '#221daf',
				}).then(() => {
					window.location.reload();
				});
				setIsLoading(false);
			})
			.catch((err) => {
				Swal.fire({
					icon: 'error',
					title: 'Link Creation Failed!',
					text: 'An error occurred, please try again',
					confirmButtonColor: '#221daf',
				});
				setIsLoading(false);
			});
	};

	return (
		<Drawer
			title="Create Short URL"
			placement="right"
			onClose={() => setOpenedCreateLink(false)}
			open={openedCreateLink}
		>
			<div>
				<form>
					<div className="form-group">
						<label>Title *</label>
						<Input onChange={(e) => handleChange('title', e)} size="large" />
					</div>
					<div className="form-group">
						<label>Long URL *</label>
						<Input onChange={(e) => handleChange('long_url', e)} size="large" />
					</div>
					<div className="form-group">
						<label>Custom end-link (optional)</label>
						<Input onChange={(e) => handleChange('stub', e)} size="large" />
					</div>
					<div className="form-group">
						<span style={{ marginRight: '10px' }}>Enabled?</span>
						<Switch defaultChecked onChange={handleSwitchChange} />
					</div>
					<div className="form-group">
						<Collapse defaultActiveKey={['1']} onChange={() => null}>
							<Panel header="UTM Parameters For Tracking (optional)" key="1">
								<div className="form-group">
									<label>UTM Source (optional)</label>
									<Input onChange={(e) => handleChange('utm_source', e)} size="large" />
								</div>
								<div className="form-group">
									<label>UTM Medium (optional)</label>
									<Input onChange={(e) => handleChange('utm_medium', e)} size="large" />
								</div>
								<div className="form-group">
									<label>UTM Campaign (optional)</label>
									<Input onChange={(e) => handleChange('utm_campaign', e)} size="large" />
								</div>
								<div className="form-group">
									<label>UTM Term (optional)</label>
									<Input onChange={(e) => handleChange('utm_term', e)} size="large" />
								</div>
								<div className="form-group">
									<label>UTM Content (optional)</label>
									<Input
										name="utm_content"
										onChange={(e) => handleChange('utm_content', e)}
										size="large"
									/>
								</div>
							</Panel>
							<Panel header="Short Link Availability" key="1">
								<div className="form-group">
									<label>Password (optional)</label>
									<Input onChange={(e) => handleChange('password_hash', e)} size="large" />
								</div>
								<div className="form-group">
									<label>Expire on (optional)</label>
									<DatePicker showTime onChange={handleDateChange} />
								</div>
							</Panel>
						</Collapse>
					</div>
					<div className="form-group">
						<Space>
							<Button size={'large'} onClick={() => setOpenedCreateLink(false)} disabled={isLoading}>
								Cancel
							</Button>
							<Button
								size={'large'}
								onClick={handleSubmit}
								type="primary"
								disabled={isLoading}
								loading={isLoading}
							>
								Submit
							</Button>
						</Space>
					</div>
				</form>
			</div>
		</Drawer>
	);
};

const LinkCardItem = ({ setOpenedLink, item }: any) => {
	const { id, title, stub, long_url, created_on, disabled } = item || {};

	const URLshortenerUser = window.localStorage.getItem('URLshortenerUser');
	let user_id = (URLshortenerUser && JSON.parse(URLshortenerUser).id) || {};

  const handleCopy = async() => {
    const text = `url-bit.web.app/${stub}`;
    if ("clipboard" in navigator) {
      await navigator.clipboard.writeText(text);
    } else {
      document.execCommand("copy", true, text);
    }
    toast('URL copied successfully!',
      {
        icon: '👏',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      }
    );
  }

	const handleDisableEnableLink = async (e: any) => {
		e.preventDefault();
		const payload = {
			// ...item,
			long_url,
			disabled: !disabled,
		};

		await http
			.patch(`/links/update/${id}?user_id=${user_id}`, payload)
			.then((res) => {
				const { id } = res.data;
				Swal.fire({
					icon: 'success',
					title: `Link ${disabled ? 'Enabled' : 'Disabled'} Successfully!`,
					text: 'You have successfully updated this link',
					confirmButtonColor: '#221daf',
				}).then(() => {
					window.location.reload();
				});
			})
			.catch((err) => {
				Swal.fire({
					icon: 'error',
					title: `Link ${disabled ? 'Enabling' : 'Disabling'} Failed!`,
					text: 'An error occurred, please try again',
					confirmButtonColor: '#221daf',
				});
			});
	};

	const handleDeleteLink = async (e: any) => {
		e.preventDefault();
		const payload = {
			// ...item,
			long_url,
			disabled: !disabled,
		};

		await http
			.delete(`/links/delete/be70a7ee-a918-4162-895e-5618b9fca387?user_id=${user_id}`)
			.then((res) => {
				Swal.fire({
					icon: 'success',
					title: `Link Deleted Successfully!`,
					text: 'You have successfully deleted this link',
					confirmButtonColor: '#221daf',
				}).then(() => {
					window.location.reload();
				});
			})
			.catch((err) => {
				Swal.fire({
					icon: 'error',
					title: `Link Deletion Failed!`,
					text: 'An error occurred, please try again',
					confirmButtonColor: '#221daf',
				});
			});
	};

	return (
		<div className="link-card">
			<div className="d-flex justify-content-between">
				<div className="col-lg-10">
					<h5>{title}</h5>
				</div>
				<div className="col-lg-2">
					<p className="time-text">
						<i className="fa-solid fa-clock"></i> {moment(created_on).fromNow()}
					</p>
				</div>
			</div>
			<div className="url-pane">
				<a href={`/${stub}`} rel="noreferrer" target="_blank">
					<p>url-bit.web.app/{stub}</p>
				</a>
				<i onClick={handleCopy} style={{cursor: 'pointer'}} className="fa-solid fa-copy"></i>
			</div>
			<p style={{ overflowWrap: 'break-word' }}>
				<b>Original URL:</b> {long_url}
			</p>
			<div className="btn-pane">
				<button className="btn btn-outline-dark" onClick={setOpenedLink}>
					<i className="fa-solid fa-eye"></i> View Engagements Analytics
				</button>
				<button className={`btn ${!disabled ? 'btn-outline-danger' : 'btn-outline-success'}`} onClick={handleDisableEnableLink}>
					{!disabled ? <i className="fa-solid fa-link-slash"></i> : <i className="fa-solid fa-link"></i>}
					{!disabled ? 'Disable Link' : 'Enable Link'}
				</button>
				<button className="btn btn-outline-primary" onClick={setOpenedLink}>
					<i className="fa-solid fa-pen-to-square"></i> Edit
				</button>
				<Popconfirm title="Are you sure？" icon={<QuestionCircleOutlined style={{ color: 'red' }} />} onConfirm={handleDeleteLink}>
					<button className="btn btn-outline-danger">
						<i className="fa-solid fa-trash"></i> Delete
					</button>
				</Popconfirm>
			</div>
		</div>
	);
};

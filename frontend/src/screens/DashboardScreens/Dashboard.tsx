import Swal from 'sweetalert2';
import { Drawer, Input } from 'antd';
import { useEffect, useState } from 'react';
import http from 'utils/api';
import './styles.scss';

let dateTime = new Date()
export var isDisabled: boolean;
export var isExpired: any;


const Dashboard = () => {
	const [openedLink, setOpenedLink] = useState<number | null>(null);
  const [openedCreateLink, setOpenedCreateLink] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [statsData, setStatsData] = useState<any>(null);
  const [linksData, setLinksData] = useState<any[]>([]);

  const URLshortenerUser  = window.localStorage.getItem("URLshortenerUser");
  let user_id = (URLshortenerUser && JSON.parse(URLshortenerUser).id) || {};
  let first_name = (URLshortenerUser && JSON.parse(URLshortenerUser).first_name) || {};

  useEffect(() => {
    fetchStats()
    fetchAllLinks()
  }, [])

  const fetchStats = async() => {
    setIsLoading(true);

    await http
      .get(`/links/stats?user_id=${user_id}`)
      .then((res) => {
        const { links } = res.data;
        setIsLoading(false);
        setStatsData(links)
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  const fetchAllLinks = async() => {
    setIsLoading(true);

    await http
      .get(`/links/all?user_id=${user_id}`)
      .then((res) => {
        const { links } = res.data;
        setIsLoading(false);
        setLinksData(links)
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  const {total_count, total_disabled, total_enabled, total_engagements} = statsData || {};

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
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<div className="d-flex justify-content-between items-center">
								<div className="welcome-pane">
									<h3>
										<b>Hey {first_name || ""}, Welcome Back!</b> 👋
									</h3>
									<p className="">Here's your dashboard stats as at today</p>
								</div>
                <button className='btn btn-main' onClick={() => setOpenedCreateLink(true)}>Shorten Link</button>
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
						{linksData.map((item: any, index: number) => {
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

  const URLshortenerUser  = window.localStorage.getItem("URLshortenerUser");
  let user_id = (URLshortenerUser && JSON.parse(URLshortenerUser).id) || {};

	const handleUpdateLink = async(e: any) =>{
		e.preventDefault();
		const payload = {
			title,
			stub,
			long_url
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
	

const CreateLinkDrawer = ({ openedCreateLink, setOpenedCreateLink }: any) => {
	return (
		<Drawer title="Create Short URL" placement="right" onClose={() => setOpenedCreateLink(false)} open={openedCreateLink}>
			<div>
        <form>
          <div className='form-group'>
            <label>Title</label>
            <Input size="large" />
          </div>
          <div className='form-group'>
            <label>Long URL</label>
            <Input size="large" />
          </div>
          <div className='form-group'>
            <label>Title</label>
            <Input size="large" />
          </div>
        </form>
      </div>
		</Drawer>
	);
};

const LinkCardItem = ({ setOpenedLink, item }: any) => {
  const { title, stub, long_url } = item || {}
  const fetchURL = async () => {
		const stub = "llRIbB6nle";
		await http
			.get(`/links/stub/${stub}`)
			.then((res) => {
				const { link } = res.data || {};
				// setLink(link);
				isDisabled = link.disabled;
				isExpired = new Date(link.expire_on) < dateTime;
			if(isDisabled == false && link.password_hash == "" && !isExpired){
				window.location.assign(link.long_url);
			}
			if(isDisabled == true || isExpired){
				window.location.assign("/****");
			}
			if(link.password_hash != ""){
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
						if(password == link.password_hash){
							window.location.assign(link.long_url);
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
	return (
		<div className="link-card">
			<div className="d-flex justify-content-between">
        <div className='col-lg-10'>
				  <h5>{title}</h5>
        </div>
        <div className='col-lg-2'>
          <p className="time-text">
            <i className="fa-solid fa-clock"></i> 2 hrs ago
          </p>
        </div>
			</div>
			<div className="url-pane">
				<p>bit.ly/{stub}</p>
				<i className="fa-solid fa-copy"></i>
			</div>
			<p style={{overflowWrap: 'break-word'}}>
				<b>Original URL:</b>{' '}
				{long_url}
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


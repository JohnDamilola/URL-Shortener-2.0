import { Link } from 'react-router-dom';
import { isDisabled, isExpired } from 'screens/DashboardScreens/Dashboard';

export const ShortUrlRedirectionPage = () => {
	return (
		<section className="page_404">
			<div className="container">
				<div className="row justify-content-center align-items-center">
						<div className="col-sm-8 text-center">
							<div className="four_zero_four_bg">
								<h1 className="text-center ">404</h1>
							</div>

							<div className="contant_box_404">
								<h3 className="h2">Look like you're lost</h3>

								<p>Sorry, the page you're looking for is disabled and expired.</p>

								<a href="/" className="link_404">
									Go to Home
								</a>
							</div>
						</div>
				</div>
			</div>
		</section>
	);

	return (
		<div id="error-page">
			<div className="content">
				<h2 className="header" data-text="404">
					404
				</h2>
				<h4 data-text="Opps! Page not found">Opps! Page not found</h4>
				{isDisabled && isExpired ? (
					<p>Sorry, the page you're looking for is disabled and expired.</p>
				) : isDisabled ? (
					<p>Sorry, the page you're looking for is disabled.</p>
				) : (
					<p>Sorry, the page you're looking for is expired.</p>
				)}
				;
				<div className="btns">
					<Link className="navbar-brand" to="/">
						<a href="https://www.codingnepalweb.com/">return home</a>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default ShortUrlRedirectionPage;

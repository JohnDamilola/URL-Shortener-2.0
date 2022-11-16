import "./styles.scss";
import { Link } from "react-router-dom";
import { NavHashLink } from 'react-router-hash-link';

const Navbar = ({ isDashboard }: any) => {

  const handleLogout = () => {
    window.localStorage.removeItem('URLshortenerUser')
    window.location.replace('/')
  }
  return (
    <nav className="navbar navbar-expand-lg sticky-top">
      <div className="container">
        <Link className="navbar-brand" to="/">
          URL Shortener
        </Link>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          {isDashboard ? (
            <div className="navbar-nav ml-auto navbar-centers gap-4">
              <li className="nav-item" onClick={handleLogout} style={{cursor: 'pointer', fontWeight: '600'}}>
                  <i className="lni lni-cross-circle mr-2" style={{fontWeight: '600'}}></i> Logout
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto navbar-centers gap-4">
              <li className="nav-item">
                <NavHashLink
                  className="nav-link active"
                  aria-current="page"
                  to="/#features"
                >
                  Features
                </NavHashLink>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/auth/login"
                >
                  Login
                </Link>
              </li>
              <Link to="/auth/register">
                <button className="btn btn-main">Register</button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

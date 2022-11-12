import "./styles.scss";
import { Link } from "react-router-dom";

const Navbar = ({ isDashboard }: any) => {

  const handleLogout = () => {
    window.localStorage.removeItem('URLshortenerUser')
    window.location.replace('/')
  }
  
};

export default Navbar;

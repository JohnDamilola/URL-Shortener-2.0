import Footer from 'components/Footer'
import Navbar from 'components/Navbar'
import { Navigate, Outlet } from 'react-router-dom'

const HomeLayout = () => {
  const URLshortenerUser = window.localStorage.getItem('URLshortenerUser');
  const isAuth = URLshortenerUser && JSON.parse(URLshortenerUser) ? true : false;

  if (isAuth) {
    return <Navigate to='/overview' replace />
  }

  return (
    <div>
      <Navbar isDashboard={isAuth} />
      <Outlet />
      <Footer />
    </div>
  )
}

export default HomeLayout
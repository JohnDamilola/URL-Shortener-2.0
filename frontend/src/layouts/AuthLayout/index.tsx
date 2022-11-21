import Navbar from 'components/Navbar'
import { Navigate, Outlet } from 'react-router-dom'

const AuthLayout = () => {
  const URLshortenerUser = window.localStorage.getItem('URLshortenerUser');
  const isAuth = URLshortenerUser && JSON.parse(URLshortenerUser) ? true : false;

  if (isAuth) {
    return <Navigate to='/overview' replace />
  }

  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  )
}

export default AuthLayout

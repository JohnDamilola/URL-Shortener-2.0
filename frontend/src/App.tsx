import AuthLayout from 'layouts/AuthLayout'
import DashboardLayout from 'layouts/DashboardLayout'
import HomeLayout from 'layouts/HomeLayout'
import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router'
import { authRoutes, dashboardRoutes, homeRoutes} from './routes'
import "swiper/css/bundle";
import ShortUrlRedirectionPage from 'screens/ErrorScreens/ShortUrlRedirectionPage'
import RedirectionPage from "screens/DashboardScreens/RedirectionPage"

const App = () => {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location])

  const URLshortenerUser = window.localStorage.getItem('URLshortenerUser');
  const isAuth = URLshortenerUser && JSON.parse(URLshortenerUser) ? true : false;

  return (
    <>
      <Routes>
        <Route path='*' element={<RedirectionPage />} />
        <Route path='a/:stub' element={<RedirectionPage />} />
        <Route element={<HomeLayout />}>
          {homeRoutes.map(({ path, element }: any, index: number) => (
            <Route path={path} element={element} key={index} />
          ))}
        </Route>

        <Route element={<AuthLayout />}>
          {authRoutes.map(({ path, element }: any, index: number) => (
            <Route path={path} element={element} key={index} />
          ))}
        </Route>

        <Route element={<DashboardLayout />}>
          {dashboardRoutes.map(({ path, element }: any, index: number) => (
            <Route path={path} element={element} key={index} />
          ))}
        </Route>
        {/* <Route path="*" element={<ShortUrlRedirectionPage />} /> */}
      </Routes>
    </>
  )
}

export default App
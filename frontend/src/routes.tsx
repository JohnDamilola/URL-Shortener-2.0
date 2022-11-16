import Login from 'screens/AuthScreens/Login'
import Register from 'screens/AuthScreens/Register'
import Dashboard from 'screens/DashboardScreens/Dashboard'
import Home from 'screens/Home'


const homeRoutes = [
  {
    path: '/',
    element: <Home />,
  }
]

const authRoutes = [
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  }
]

const dashboardRoutes = [
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
]

export { homeRoutes, authRoutes, dashboardRoutes }
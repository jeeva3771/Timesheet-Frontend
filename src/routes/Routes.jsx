import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { allAdminRoutes, allBlankRoutes } from './index'
import VerticalLayout from '@/layout/VerticalLayout'
import DefaultLayout from '@/layout/DefaultLayout'
import {
  adminMenu,
  managerMenu,
  hrAndEmployeeMenu
} from '@/common/roleMenu'

const AllRoutes = (props) => {
  const location = useLocation()
  const role = JSON.parse(localStorage.getItem('role')) || ''
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'

  const getAllowedRoutes = (role) => {
    switch (role) {
      case 'admin':
        return allAdminRoutes.filter(route =>
          adminMenu.includes(route.path)
        )
      case 'manager':
        return allAdminRoutes.filter(route =>
          managerMenu.includes(route.path)
        )
      case 'hr':
      case 'employee':
        return allAdminRoutes.filter(route =>
          hrAndEmployeeMenu.includes(route.path)
        )
      default:
        return []
    }
  }

  const protectedRoutes = getAllowedRoutes(role)
  const normalizedPath = location.pathname.replace(/\/+/g, '/').replace(/\/$/, '') || '/'

  if ((isAuthenticated && ['/', '/login'].includes(normalizedPath))) {
    if (role === 'admin' || role === 'manager') {
      return <Navigate to="/dashboard/" replace />
    } else if (role === 'hr' || role === 'employee') {
      return <Navigate to="/timesheets/user/" replace />
    }
  }

  if (!isAuthenticated && !['/', '/login', '/resetpassword'].includes(normalizedPath)) {
    return <Navigate to="/" replace />
  }

  return (
    <Routes>
      {allBlankRoutes.map((route, idx) => (
        <Route
          key={idx}
          path={route.path}
          element={<DefaultLayout {...props}>{route.element}</DefaultLayout>}
        />
      ))}

      {protectedRoutes.map((route, idx) => (
        <Route
          key={idx}
          path={route.path}
          element={
            isAuthenticated ? (
              <VerticalLayout {...props}>{route.element}</VerticalLayout>
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
      ))}

      <Route
        path="*"
        element={
          isAuthenticated ? (
            <Navigate to="/dashboard/" replace />
          ) : (
            <Navigate to="/" replace />
          )
        }
      />
    </Routes>
  )
}

export default AllRoutes

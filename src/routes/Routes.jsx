// import { Navigate, Route, Routes } from 'react-router-dom'
// // import { useAuthContext } from "@/context";
// import { allAdminRoutes, allBlankRoutes } from './index'
// import VerticalLayout from '@/layout/VerticalLayout'
// import DefaultLayout from '@/layout/DefaultLayout'
// import { useAuthContext } from '@/context'
// const AllRoutes = (props) => {
// 	const role = JSON.parse(localStorage.getItem('role'))
// 	const isAuthenticated = localStorage.getItem('isAuthenticated')
// 	console.log(isAuthenticated)
// 	return (
// 		<Routes>
// 			<Route>
// 				{allBlankRoutes.map((route, idx) => (
// 					<Route
// 						key={idx}
// 						path={route.path}
// 						element={<DefaultLayout {...props}>{route.element}</DefaultLayout>}
// 					/>
// 				))}
// 			</Route>

// 			<Route>
// 				{allAdminRoutes.map((route, idx) => (
// 					<Route
// 						path={route.path}
// 						element={
// 							isAuthenticated === false ? (
// 								<Navigate
// 									to={{
// 										pathname: '/',
// 										search: route.path,
// 									}}
// 								/>
// 							) : (
// 								<VerticalLayout {...props}>{route.element}</VerticalLayout>
// 							)
// 						}
// 						key={idx}
// 					/>
// 				))}
// 			</Route>

// 			{/* <Route>
//           {allAdminFlattedRoutes.map((route, idx) => (
//             <Route
//               key={idx}
//               path={route.path}
//               element={
//                 (isAuthenticated && session?.role == 'admin') ? (
//                   <AdminLayout {...props}>{route.element}</AdminLayout>
//                 ) : (
//                   <Navigate
//                     to={{
//                       pathname: "/login/",
//                       search: "redirectTo=" + route.path,
//                     }}
//                   />
//                 )
//               }
//             />
//           ))}
//         </Route> */}
// 		</Routes>
// 	)
// }
// export default AllRoutes


// import { Navigate, Route, Routes } from 'react-router-dom'
// import { allAdminRoutes, allBlankRoutes } from './index'
// import VerticalLayout from '@/layout/VerticalLayout'
// import DefaultLayout from '@/layout/DefaultLayout'

// const AllRoutes = (props) => {
// 	// Get data from localStorage
// 	const role = JSON.parse(localStorage.getItem('role')) || ''
// 	const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'

// 	// Function to return allowed routes based on role
// 	const getAllowedRoutes = (role) => {
// 		switch (role) {
// 			case 'admin':
// 				return allAdminRoutes
// 			case 'manager':
// 				return allAdminRoutes.filter(route =>
// 					['/dashboard/', '/projects/', '/timesheets/'].includes(route.path)
// 				)
// 			case 'employee':
// 			case 'hr':
// 				return allAdminRoutes.filter(route =>
// 					['/timereport/', '/timesheets/'].includes(route.path)
// 				)
// 			default:
// 				return []
// 		}
// 	}

// 	return (
// 		<Routes>
// 			{/* Auth & Error pages (blank layout) */}
// 			<Route>
// 				{allBlankRoutes.map((route, idx) => (
// 					<Route
// 						key={idx}
// 						path={route.path}
// 						element={<DefaultLayout {...props}>{route.element}</DefaultLayout>}
// 					/>
// 				))}
// 			</Route>

// 			{/* Protected Routes (Vertical Layout) */}
// 			<Route>
// 				{getAllowedRoutes(role).map((route, idx) => (
// 					<Route
// 						key={idx}
// 						path={route.path}
// 						element={
// 							isAuthenticated ? (
// 								<VerticalLayout {...props}>{route.element}</VerticalLayout>
// 							) : (
// 								<Navigate to="/" />
// 							)
// 						}
// 					/>
// 				))}
// 			</Route>
// 		</Routes>
// 	)
// }

// export default AllRoutes

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

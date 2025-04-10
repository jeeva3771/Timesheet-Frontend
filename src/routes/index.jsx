import { lazy } from 'react'

//dashboards
const Dashboard = lazy(() => import('@/pages/dashboards/Project'))

// user
const UserForm = lazy(() => import('@/pages/structure/Users/Form'))
const UsersList = lazy(() => import('@/pages/structure/Users/List'))
// project
const Projects = lazy(() => import('@/pages/structure/Projects/List'))
const ProjectForm = lazy(() => import('@/pages/structure/Projects/Form'))
const History = lazy(() => import('@/pages/structure/Projects/History.jsx'))
//Timesheet
const Timesheets = lazy(() => import('@/pages/structure/Timesheets/List'))

const TimesheetForm = lazy(() => import('@/pages/structure/Timesheetform'))



//Pages
const ProfilePage = lazy(() => import('@/pages/other-pages/Profile'))
const FAQsPage = lazy(() => import('@/pages/other-pages/FAQs'))
//auth pages
const Login = lazy(() => import('@/pages/auth/Login'))
const Register = lazy(() => import('@/pages/auth/Register'))
const ResetPassword = lazy(() => import('@/pages/auth/ResetPassword'))
const LockScreen = lazy(() => import('@/pages/auth/LockScreen'))
//error Pages
const NotFound = lazy(() => import('@/pages/error/PageNotFound'))
const NotFoundAlt = lazy(() => import('@/pages/error/PageNotFoundAlt'))
const Error500 = lazy(() => import('@/pages/error/Error500'))
const Error500Alt = lazy(() => import('@/pages/error/Error500Alt'))
const dashboardRoutes = [
	{
		path: '/dashboard/',
		name: 'home',
		element: <Dashboard />,
	}
]

const Structure = [
	{
		path: '/users/',
		name: 'user',
		element: <UsersList />,
	}, 
	{
		path: '/users/add/',
		name: 'user form',
		element: <UserForm/>,
	},
	{
		path: '/projects/',
		name: 'project',
		element: <Projects />,
	},
	{
		path: '/projects/add/',
		name: 'project form',
		element: <ProjectForm />,
	},
	{
		path: '/history/',
		name: 'history',
		element: <History />,
	},
	{
		path: '/timesheets/',
		name: 'timesheet',
		element: <Timesheets />,
	},
	{
		path: '/timereport/',
		name: 'timereport',
		element: <TimesheetForm />,
	}
]

const pagesRoutes = [
	{
		path: '/profile/',
		name: 'Profile',
		element: <ProfilePage />,
	},
	{
		path: '/faqs/',
		name: 'Faqs',
		element: <FAQsPage />,
	}
]
const authRoutes = [
	{
		path: '/',
		name: 'Login',
		element: <Login />,
	},
	{
		path: '/auth/register',
		name: 'Register',
		element: <Register />,
	},
	{
		path: '/resetpassword/',
		name: 'resetpassword',
		element: <ResetPassword />,
	},
	{
		path: '/auth/lock-screen',
		name: 'Lock Screen',
		element: <LockScreen />,
	}
]
const otherRoutes = [
	{
		path: '/not-found',
		name: 'Page Not Found',
		element: <NotFound />,
	},
	{
		path: '/not-found-alt',
		name: 'Page Not Found Alt',
		element: <NotFoundAlt />,
	},
	{
		path: '/error-500',
		name: 'Error 500',
		element: <Error500 />,
	},
	{
		path: '/error-500-alt',
		name: 'Error 500 Alt',
		element: <Error500Alt />,
	},
	{
		path: '*',
		name: 'Page Not Found',
		element: <NotFound />,
	},
]
const allBlankRoutes = [...otherRoutes, ...authRoutes]
const allUiRoutes = [
	...Structure,
]
const allAdminRoutes = [
	...dashboardRoutes,
	...allUiRoutes,
	...pagesRoutes,
]
export { allAdminRoutes, allBlankRoutes }

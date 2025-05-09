import { lazy } from 'react'

//dashboards
const Dashboard = lazy(() => import('@/pages/structure/Dashboard'))

// user
const UserForm = lazy(() => import('@/pages/structure/Users/Form'))
const UsersList = lazy(() => import('@/pages/structure/Users/List'))
// project
const Projects = lazy(() => import('@/pages/structure/Projects/List'))
const ProjectForm = lazy(() => import('@/pages/structure/Projects/Form'))
const History = lazy(() => import('@/pages/structure/Projects/History.jsx'))
//Timesheet
const Timesheets = lazy(() => import('@/pages/structure/Timesheets/List'))
const TimesheetEditForm = lazy(() => import('@/pages/structure/Timesheets/Form'))
const TimeSheetHistory = lazy(() => import('@/pages/structure/Timesheets/History'))


const TimesheetForm = lazy(() => import('@/pages/structure/employee/Form'))
const TimesheetsUser = lazy(() => import('@/pages/structure/employee/List'))



//Pages
const ProfilePage = lazy(() => import('@/pages/structure/Profile'))
const FAQsPage = lazy(() => import('@/pages/structure/FAQs'))
//auth pages
const Login = lazy(() => import('@/pages/structure/Auth/Login'))
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
		roles: ["admin"]
	}, 
	{
		path: '/users/add/',
		name: 'user form',
		element: <UserForm/>,
		roles: ["admin"]
	},
	{
		path: '/users/:userId/',
		name: 'user form',
		element: <UserForm/>,
		roles: ["admin"]
	},
	{
		path: '/projects/',
		name: 'project',
		element: <Projects />,
		roles: ["admin", "manager"]
	},
	{
		path: '/projects/add/',
		name: 'project form',
		element: <ProjectForm />,
		roles: ["admin", "manager"]
	},
	{
		path: '/projects/:projectId/',
		name: 'project form',
		element: <ProjectForm />,
		roles: ["admin", "manager"]
	},
	{
		path: '/history/',
		name: 'history',
		element: <History />,
		roles: ["admin", "manager"]
	},
	{
		path: '/timesheets/',
		name: 'timesheet',
		element: <Timesheets />,
		roles: ["admin", "manager"]
	},
	{
		path: '/timesheets/:timesheetId',
		name: 'timesheet editform',
		element: <TimesheetEditForm />,
		roles: ["admin", "manager"]
	},
	{
		path: '/timesheets/history/',
		name: 'timesheet history',
		element: <TimeSheetHistory />,
		roles: ["admin", "manager"]
	},
	{
		path: '/timereport/',
		name: 'timereport',
		element: <TimesheetForm />,
		roles: ["hr", "employee"]
	},
	{
		path: '/timesheets/user/',
		name: 'timesheetuser',
		element: <TimesheetsUser />,
		roles: ["hr", "employee"]
	}
]

const pagesRoutes = [
	{
		path: '/profile/',
		name: 'Profile',
		element: <ProfilePage />,
		roles: ["admin", "manager", "hr", "employee"]
	},
	{
		path: '/faqs/',
		name: 'Faqs',
		element: <FAQsPage />,
		roles: ["admin", "manager"]
	}
]
const authRoutes = [
	
	{
		path: '/',
		name: 'Login',
		element: <Login />,
	},
	{
		path: '/login/',
		name: 'LoginAlias',
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

/* eslint-disable react-refresh/only-export-components */
import { lazy } from 'react'

//dashboards

const Dashboard = lazy(() => import('@/pages/dashboards/Project'))

//apps
const ProjectClient = lazy(() => import('@/pages/apps/projects/Clients'))
const ProjectTeam = lazy(() => import('@/pages/apps/projects/Teams'))
const ProjectApp = lazy(() => import('@/pages/apps/projects/Project'))
const ProjectTask = lazy(() => import('@/pages/apps/projects/Task'))
const ProjectKanban = lazy(() => import('@/pages/apps/projects/KanbanBoard'))
const ProjectChat = lazy(() => import('@/pages/apps/projects/Chat'))
const ProjectUsers = lazy(() => import('@/pages/apps/projects/Users'))
const ProjectCreate = lazy(() => import('@/pages/apps/projects/CreateProject'))

// user
const UserList = lazy(() => import('@/pages/structure/User/Form'))
const UserForm = lazy(() => import('@/pages/structure/User/List'))
// project
const Project = lazy(() => import('@/pages/structure/Project/List'))
const ProjectForm = lazy(() => import('@/pages/structure/Project/Form'))
//Timesheet
const Timesheet = lazy(() => import('@/pages/structure/Timesheet/List'))

const TimesheetForm = lazy(() => import('@/pages/structure/Timesheetform'))



//Pages
const ProfilePage = lazy(() => import('@/pages/other-pages/Profile'))
// const TimelinePage = lazy(() => import('@/pages/other-pages/Timeline'))
// const TreeviewPage = lazy(() => import('@/pages/other-pages/Treeview'))
// const StarterPage = lazy(() => import('@/pages/other-pages/Stater'))
// const PricingPage = lazy(() => import('@/pages/other-pages/Pricing'))
// const BlogPage = lazy(() => import('@/pages/other-pages/Blogs'))
const FAQsPage = lazy(() => import('@/pages/other-pages/FAQs'))
// const GalleryPage = lazy(() => import('@/pages/other-pages/Gallery'))
// const TourPage = lazy(() => import('@/pages/other-pages/Tour'))

//auth pages
const Login = lazy(() => import('@/pages/auth/Login'))
const Register = lazy(() => import('@/pages/auth/Register'))
const ResetPassword = lazy(() => import('@/pages/auth/ResetPassword'))
const LockScreen = lazy(() => import('@/pages/auth/LockScreen'))
const LoginAlt = lazy(() => import('@/pages/auth-alt/Login'))
const ResetPasswordAlt = lazy(() => import('@/pages/auth-alt/ResetPassword'))
const RegisterAlt = lazy(() => import('@/pages/auth-alt/Register'))
const LockScreenAlt = lazy(() => import('@/pages/auth-alt/LockScreen'))

//error Pages
const NotFound = lazy(() => import('@/pages/error/PageNotFound'))
const NotFoundAlt = lazy(() => import('@/pages/error/PageNotFoundAlt'))
const Error500 = lazy(() => import('@/pages/error/Error500'))
const Error500Alt = lazy(() => import('@/pages/error/Error500Alt'))
const dashboardRoutes = [
	{
		path: '/home/',
		name: 'home',
		element: <Dashboard />,
	}
]
const appsRoutes = [
	{
		path: '/apps/projects/clients',
		name: 'Project Client',
		element: <ProjectClient />,
	},
	{
		path: '/apps/projects/team',
		name: 'Project Team',
		element: <ProjectTeam />,
	},
	{
		path: '/apps/projects/project',
		name: 'Project',
		element: <ProjectApp />,
	},
	{
		path: '/apps/projects/task',
		name: 'Task',
		element: <ProjectTask />,
	},
	{
		path: '/apps/projects/kanban-board',
		name: 'Kanban Board',
		element: <ProjectKanban />,
	},
	{
		path: '/apps/projects/chat',
		name: 'Chat',
		element: <ProjectChat />,
	},
	{
		path: '/apps/projects/users',
		name: 'Users',
		element: <ProjectUsers />,
	},
	{
		path: '/apps/projects/create',
		name: 'Project Create',
		element: <ProjectCreate />,
	},
] 

const Structure = [
	{
		path: '/user/',
		name: 'user',
		element: <UserForm />,
	}, 
	{
		path: '/user/add/',
		name: 'user form',
		element: <UserList />,
	},
	{
		path: '/project/',
		name: 'project',
		element: <Project />,
	},
	{
		path: '/project/add/',
		name: 'project form',
		element: <ProjectForm />,
	},
	{
		path: '/timesheet/',
		name: 'timesheet',
		element: <Timesheet />,
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
	// {
	// 	path: '/pages/tour',
	// 	name: 'Tour',
	// 	element: <TourPage />,
	// },
	// {
	// 	path: '/pages/timeline',
	// 	name: 'Timeline',
	// 	element: <TimelinePage />,
	// },
	// {
	// 	path: '/pages/treeview',
	// 	name: 'Treeview',
	// 	element: <TreeviewPage />,
	// },
	// {
	// 	path: '/pages/starter',
	// 	name: 'Starter Page',
	// 	element: <StarterPage />,
	// },
	// {
	// 	path: '/pages/pricing',
	// 	name: 'Pricing',
	// 	element: <PricingPage />,
	// },
	// {
	// 	path: '/pages/blogs',
	// 	name: 'Blogs',
	// 	element: <BlogPage />,
	// },
	{
		path: '/faqs/',
		name: 'Faqs',
		element: <FAQsPage />,
	},
	// {
	// 	path: '/pages/gallery',
	// 	name: 'Gallery',
	// 	element: <GalleryPage />,
	// },
]
const authRoutes = [
	{
		path: '/login/',
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
	},
	{
		path: '/login/-alt',
		name: 'Login Alt',
		element: <LoginAlt />,
	},
	{
		path: '/auth/register-alt',
		name: 'Register Alt',
		element: <RegisterAlt />,
	},
	{
		path: '/auth/re-password-alt',
		name: 'Re Password Alt',
		element: <ResetPasswordAlt />,
	},
	{
		path: '/auth/lock-screen-alt',
		name: 'Lock Screen Alt',
		element: <LockScreenAlt />,
	},
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
	...appsRoutes,
	...allUiRoutes,
	...pagesRoutes,
]
export { allAdminRoutes, allBlankRoutes }

// const TWO_COl_MENU_ITEMS = [
// 	{
// 		key: 'dashboard',
// 		icon: 'smart-home',
// 		label: 'Dashboard',
// 		isTitle: true,
// 		children: [
// 			{
// 				key: 'ds-project',
// 				label: 'Home',
// 				url: '/dashboard/',
// 				parentKey: 'dashboard',
// 			},
// 		],
// 	},

// 	{
// 		key: 'ui',
// 		icon: 'planet',
// 		label: '',
// 		isTitle: true,
// 		children: [
// 			{
// 				key: 'user',
// 				label: 'User',
// 				isTitle: false,
// 				parentKey: 'ui',
// 				url: '/users/'
// 			},
// 			{
// 				key: 'project',
// 				label: 'Project',
// 				isTitle: false,
// 				parentKey: 'ui',
// 				url: '/projects/'
// 			},
// 			{
// 				key: 'timesheet',
// 				label: 'Time sheet',
// 				isTitle: false,
// 				parentKey: 'ui',
// 				url: '/timesheets/' 
// 			},
// 			{
// 				key: 'timereport',
// 				label: 'Report',
// 				isTitle: false,
// 				parentKey: 'ui',
// 				url: '/timereport/' 
// 			}
			
// 		],
// 	},
// 	// {
// 	// 	key: 'pages',
// 	// 	icon: 'files',
// 	// 	label: 'Pages',
// 	// 	isTitle: true,
// 	// 	children: [
// 	// 		{
// 	// 			key: 'pages-profile',
// 	// 			label: 'Profile',
// 	// 			url: '/pages/profile',
// 	// 			parentKey: 'pages',
// 	// 		},
// 	// 		{
// 	// 			key: 'pages-tour',
// 	// 			label: 'Tour',
// 	// 			url: '/pages/tour',
// 	// 			parentKey: 'pages',
// 	// 		},
// 	// 		{
// 	// 			key: 'pages-timeline',
// 	// 			label: 'Timeline',
// 	// 			url: '/pages/timeline',
// 	// 			parentKey: 'pages',
// 	// 		},
// 	// 		{
// 	// 			key: 'pages-tree-view',
// 	// 			label: 'Treeview',
// 	// 			url: '/pages/treeview',
// 	// 			parentKey: 'pages',
// 	// 		},
// 	// 		{
// 	// 			key: 'pages-starter-page',
// 	// 			label: 'Starter Page',
// 	// 			url: '/pages/starter',
// 	// 			parentKey: 'pages',
// 	// 		},
// 	// 		{
// 	// 			key: 'pages-pricing',
// 	// 			label: 'Pricing',
// 	// 			url: '/pages/pricing',
// 	// 			parentKey: 'pages',
// 	// 		},
// 	// 		{
// 	// 			key: 'pages-blogs',
// 	// 			label: 'Blogs',
// 	// 			url: '/pages/blogs',
// 	// 			parentKey: 'pages',
// 	// 		},
// 	// 		{
// 	// 			key: 'pages-faqs',
// 	// 			label: 'FAQs',
// 	// 			url: '/pages/faqs',
// 	// 			parentKey: 'pages',
// 	// 		},
// 	// 		{
// 	// 			key: 'pages-gallery',
// 	// 			label: 'Gallery',
// 	// 			url: '/pages/gallery',
// 	// 			parentKey: 'pages',
// 	// 		},
// 	// 	],
// 	// },
// 	{
// 		key: 'auth',
// 		icon: 'files',
// 		label: 'Details',
// 		isTitle: true,
// 		children: [
// 			{
// 				key: 'faqs',
// 				label: 'FAQs',
// 				url: '/faqs/',	
// 				parentKey: 'auth',
// 			},
// 			// {
// 			// 	key: 'auth-login',
// 			// 	label: 'Log In',
// 			// 	url: '/login/',
// 			// 	parentKey: 'auth',
// 			// },
// 			// {
// 			// 	key: 'auth-login-alt',
// 			// 	label: 'Log In alt',
// 			// 	url: '/login/-alt',
// 			// 	parentKey: 'auth',
// 			// },
// 			// {
// 			// 	key: 'auth-register',
// 			// 	label: 'Register',
// 			// 	url: '/auth/register',
// 			// 	parentKey: 'auth',
// 			// },
// 			// {
// 			// 	key: 'auth-register-alt',
// 			// 	label: 'Register alt',
// 			// 	url: '/auth/register-alt',
// 			// 	parentKey: 'auth',
// 			// },
// 			// {
// 			// 	key: 'auth-re-password',
// 			// 	label: 'Re Password',
// 			// 	url: '/auth/re-password',
// 			// 	parentKey: 'auth',
// 			// },
// 			// {
// 			// 	key: 'auth-re-password-alt',
// 			// 	label: 'Re Password Alt',
// 			// 	url: '/auth/re-password-alt',
// 			// 	parentKey: 'auth',
// 			// },
// 			// {
// 			// 	key: 'auth-lock-screen',
// 			// 	label: 'Lock Screen',
// 			// 	url: '/auth/lock-screen',
// 			// 	parentKey: 'auth',
// 			// },
// 			// {
// 			// 	key: 'auth-lock-screen-alt',
// 			// 	label: 'Lock Screen alt',
// 			// 	url: '/auth/lock-screen-alt',
// 			// 	parentKey: 'auth',
// 			// },
// 			// {
// 			// 	key: 'auth-error-404',
// 			// 	label: 'Error 404',
// 			// 	url: '/not-found',
// 			// 	parentKey: 'auth',
// 			// },
// 			// {
// 			// 	key: 'auth-error-404-alt',
// 			// 	label: 'Error 404 alt',
// 			// 	url: '/not-found-alt',
// 			// 	parentKey: 'auth',
// 			// },
// 			// {
// 			// 	key: 'auth-error-500',
// 			// 	label: 'Error 500',
// 			// 	url: '/error-500',
// 			// 	parentKey: 'auth',
// 			// },
// 			// {
// 			// 	key: 'auth-error-500-alt',
// 			// 	label: 'Error 500 alt',
// 			// 	url: '/error-500-alt',
// 			// 	parentKey: 'auth',
// 			// },
// 		],
// 	},
// ]
// export { TWO_COl_MENU_ITEMS }


const TWO_COl_MENU_ITEMS = [
	{
	  key: 'dashboard',
	  icon: 'smart-home',
	  url: '/dashboard/',  // Direct URL for the icon
	  label: 'Dashboard'
	},
	{
	  key: 'user',
	  icon: 'users',
	  url: '/users/',  // You can select one main URL for UI section (e.g., User or Project, etc.)
	  label: 'Users'
	},
	{
	  key: 'project',
	  icon: 'clipboard-list',
	  url: '/projects/',
	  label: 'Projects'
	},
	{
	  key: 'timesheet',
	  icon: 'report',
	  url: '/timesheets/',
	  label: 'Time Sheets'
	},
	{
	  key: 'timereport',
	  icon: 'clock',
	  url: '/timereport/',
	  label: 'Report'
	},
	{
	  key: 'auth',
	  icon: 'files',
	  url: '/faqs/',  // URL for Auth section
	  label: 'FAQ'
	},
  ]
  
  export { TWO_COl_MENU_ITEMS }
  
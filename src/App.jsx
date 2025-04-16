import AllRoutes from './routes/Routes'
import { Toaster } from 'sonner'
import { AuthProvider, ThemeProvider } from './context'

// default light mode
import '@/assets/scss/app.scss'

// default dark mode (uncomment below file, and comment the rest to use dark theme mode)
// import '@/assets/scss/app-dark.scss'

// material light mode (uncomment below 2 files, and comment the rest to use material theme mode)
// import '@/assets/scss/app-material.scss'
// import '@/assets/scss/bootstrap-material.scss'

// icons (keep the below icons file separate from the above ones)
import '@/assets/scss/icons.scss'

function App() {
	return (
		<ThemeProvider>
			<AuthProvider>
				<AllRoutes />
				<Toaster richColors />
			</AuthProvider>
		</ThemeProvider>
	)
}
export default App

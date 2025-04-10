import { deleteCookie, hasCookie, setCookie } from 'cookies-next'
import { use } from 'react'
import { createContext, useContext, useState } from 'react'
const AuthContext = createContext(undefined)
export function useAuthContext() {
	const context = useContext(AuthContext)
	if (context === undefined) {
		throw new Error('useAuthContext must be used within an AuthProvider')
	}
	return context
}

export function AuthProvider({ children }) {
	// const [isAuthenticated, setAuthenticated] = useState(false)
	const [user, setUser] = useState(undefined)
	const [role, setRole] = useState(undefined)
	const saveUserLogged = (user) => {
		localStorage.clear()
		localStorage.setItem('isAuthenticated', true)
		localStorage.setItem('user', JSON.stringify(user))
		localStorage.setItem('role', JSON.stringify(user.role))
		setUser(user)
		setRole(user.role)
	}
	const removeUserLogged = () => {
		localStorage.removeItem('isAuthenticated', false)
		localStorage.removeItem('user')
		localStorage.removeItem('role')
		setUser(undefined)
		setRole(undefined)
	}
	return (
		<AuthContext.Provider
			value={{
				user,
				role,
				saveUserLogged,
				removeUserLogged,
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}

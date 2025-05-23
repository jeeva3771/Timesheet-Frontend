import {
	Dropdown,
	DropdownDivider,
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
	Image,
} from 'react-bootstrap'
import { useAuthContext } from '@/context'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { successAndCatchErrorToastOptions } from '@/pages/structure/utils/Toastoption'
import { logout } from '@/pages/structure/Api'
import { capitalizeFirst, capitalizeWords } from '@/pages/structure/utils/util'
import { useEffect, useState } from 'react'
const apiUrl = import.meta.env.VITE_API_URL
import defaultjpg from '@/assets/images/users/default.jpg'


const ProfileDropdown = () => {	
	let user = JSON.parse(localStorage.getItem("user"))	|| {}	  
	const { removeUserLogged } = useAuthContext()
	const navigate = useNavigate()

	const [userData, setUserData] = useState(user)
	useEffect(() => {
		const storedUser = JSON.parse(localStorage.getItem("user")) || {}
		setUserData(storedUser)
	}, [])
	

	async function handleLogout() {
		try {
			const { response, error } = await logout()
			if (error) {
				toast.error(error, errorToastOptions)
				return
			}

			if (response.status === 401) {
				removeUserLogged()
				navigate('/')
				return
			}

			if (response.status === 403) {
				toast.error(await response.json(), errorToastOptions)
				removeUserLogged()
				navigate('/')
				return
			}

			if (response.ok) {
				removeUserLogged()
				navigate('/')
				return
			}
		} catch (error) {
			toast.error(
				'Something went wrong. Please try again later.',
				successAndCatchErrorToastOptions
			)
		}
	}

	return (
		<Dropdown>
			<DropdownToggle as="a" className="nav-link nav-user" role="button">
				<div className="d-flex align-items-center">
					<Image 
						src={`${apiUrl}/api/users/avatar/?t=${Date.now()}` || defaultjpg} 
						className="rounded-circle me-2 thumb-sm" 
					/>
					<div>
						<small className="d-none d-md-block font-11">{user.role === 'hr' ? 'HR' : capitalizeFirst(user.role)}</small>
						<span className="d-none d-md-block fw-semibold font-12">
							{capitalizeWords(userData.name)}<i className="mdi mdi-chevron-down" />
						</span>
					</div>
				</div>
			</DropdownToggle>
			<DropdownMenu align="end">
				<DropdownItem onClick={() => navigate(`/profile/`)}>
					<i className="ti ti-user font-16 me-1 align-text-bottom" /> Profile
				</DropdownItem>
				<DropdownDivider className="mb-0" />
				<DropdownItem onClick={() => handleLogout()}>
					<i className="ti ti-power font-16 me-1 align-text-bottom" /> Logout
				</DropdownItem>
			</DropdownMenu>
		</Dropdown>
	)
}
export default ProfileDropdown

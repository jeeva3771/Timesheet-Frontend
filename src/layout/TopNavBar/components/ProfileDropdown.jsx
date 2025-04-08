import {
	Dropdown,
	DropdownDivider,
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
	Image,
} from 'react-bootstrap'
import user4 from '@/assets/images/users/user-4.jpg'
import { useAuthContext } from '@/context'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
const ProfileDropdown = () => {
	const apiUrl = import.meta.env.VITE_API_URL

	const { removeSession } = useAuthContext()
	const navigate = useNavigate()

	const handleProfileDetails = () => {
		navigate('/profile/')
	}

	async function logout() {
		try {
			const response = await fetch(`${apiUrl}/api/logout/`, {
				method: 'GET',
				credentials: 'include'
			})
	
			if (response.status === 200) {
				removeSession()
				navigate('/')
				return
			}
		} catch (error) {
			toast.error('Something went wrong. Please try again later.', {
				position: 'top-right',
				duration: 2000,
			})
		}
	}
	return (
		<Dropdown>
			<DropdownToggle as="a" className="nav-link nav-user" role="button">
				<div className="d-flex align-items-center">
					<Image src={user4} className="rounded-circle me-2 thumb-sm" />
					<div>
						<small className="d-none d-md-block font-11">Admin</small>
						<span className="d-none d-md-block fw-semibold font-12">
							Maria Gibson <i className="mdi mdi-chevron-down" />
						</span>
					</div>
				</div>
			</DropdownToggle>
			<DropdownMenu align="end">
				<DropdownItem onClick={() => handleProfileDetails()}>
					<i className="ti ti-user font-16 me-1 align-text-bottom" /> Profile
				</DropdownItem>
				<DropdownDivider className="mb-0" />
				<DropdownItem onClick={() => logout()}>
					<i className="ti ti-power font-16 me-1 align-text-bottom" /> Logout
				</DropdownItem>
			</DropdownMenu>
		</Dropdown>
	)
}
export default ProfileDropdown

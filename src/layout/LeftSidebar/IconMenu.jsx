import { Nav, NavItem, NavLink, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import SimpleBar from 'simplebar-react'
import logoSm from '@/assets/images/logo-sm.png'
import user4 from '@/assets/images/users/user-4.jpg'
import 'simplebar-react/dist/simplebar.min.css'

/**
 * Renders the application menu
 */

const IconMenu = ({ menuItems, activeMenuItems }) => {
	return (
		<div className="main-icon-menu">
			<Link to="/home/" className="logo logo-metrica d-block text-center">
				<span>
					<img src={logoSm} alt="logo-small" className="logo-sm" />
				</span>
			</Link>
			<div className="main-icon-menu-body">
				<SimpleBar
					className="position-reletive h-100"
					data-simplebar
					style={{
						overflowX: 'hidden',
					}}
				>
					<Nav className="nav nav-tabs" role="tablist" id="tab-menu">
						{(menuItems || []).map((item, idx) => {
							return (
								<NavItem key={idx}>
									<NavLink
										eventKey={idx}
										id="dashboard-tab"
										onClick={() => activeMenuItems(idx)}
									>
										<OverlayTrigger
											placement="right"
											trigger="focus"
											overlay={<Tooltip>{item.label}</Tooltip>}
										>
											<i className={`ti ti-${item.icon} menu-icon`} />
										</OverlayTrigger>
									</NavLink>
								</NavItem>
							)
						})}
					</Nav>
				</SimpleBar>
			</div>
			<div className="pro-metrica-end">
				<Link to="" className="profile">
					<img
						src={user4}
						alt="profile-user"
						className="rounded-circle thumb-sm"
					/>
				</Link>
			</div>
		</div>
	)
}
export default IconMenu

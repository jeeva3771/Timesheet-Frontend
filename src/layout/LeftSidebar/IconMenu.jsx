// import { Nav, NavItem, NavLink, OverlayTrigger, Tooltip } from 'react-bootstrap'
// import { Link } from 'react-router-dom'
// import SimpleBar from 'simplebar-react'
// import logoSm from '@/assets/images/logo-sm.png'
// import 'simplebar-react/dist/simplebar.min.css'

// /**
//  * Renders the application menu
//  */

// const IconMenu = ({ menuItems, activeMenuItems }) => {
// 	return (
// 		<div className="main-icon-menu">
// 			<Link to="/dashboard/" className="logo logo-metrica d-block text-center">
// 				<span>
// 					<img src={logoSm} alt="logo-small" className="logo-sm" />
// 				</span>
// 			</Link>
// 			<div className="main-icon-menu-body">
// 				<SimpleBar
// 					className="position-reletive h-100"
// 					data-simplebar
// 					style={{
// 						overflowX: 'hidden',
// 					}}
// 				>
// 					<Nav className="nav nav-tabs" role="tablist" id="">
// 						{(menuItems || []).map((item, idx) => {
// 							return (
// 								<NavItem key={idx}>
// 									<NavLink
// 										eventKey={idx}
// 										id="dashboard-tab"
// 										onClick={() => activeMenuItems(idx)}
// 									>
// 										<OverlayTrigger
// 											placement="right"
// 											trigger="focus"
// 											overlay={<Tooltip>{item.label}</Tooltip>}
// 										>
// 											<i className={`ti ti-${item.icon} menu-icon`} />
// 										</OverlayTrigger>
// 									</NavLink>
// 								</NavItem>
// 							)
// 						})}
// 					</Nav>
// 				</SimpleBar>
// 			</div>
// 		</div>
// 	)
// }
// export default IconMenu

                                  



// import { Nav, NavItem, NavLink, OverlayTrigger, Tooltip } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
// import SimpleBar from 'simplebar-react';
// import logoSm from '@/assets/images/logo-sm.png';
// import 'simplebar-react/dist/simplebar.min.css';

// const IconMenu = ({ menuItems, activeMenuItems }) => {
//   return (
//     <div className="main-icon-menu">
//       <Link to="/dashboard/" className="logo logo-metrica d-block text-center">
//         <span>
//           <img src={logoSm} alt="logo-small" className="logo-sm" />
//         </span>
//       </Link>
//       <div className="main-icon-menu-body">
//         <SimpleBar 
// 			className="position-reletive h-100" 
// 			data-simplebar 
// 		>
//           <Nav className="nav nav-tabs" role="tablist" id="tab-menu">
//             {(menuItems || []).map((item, idx) => (
//             <NavItem key={idx}>
// 				<NavLink eventKey={idx} id="dashboard-tab" as={Link} to={item.url} onClick={() => activeMenuItems(idx)}>
// 					<OverlayTrigger placement="right" trigger="focus" overlay={<Tooltip>{item.label}</Tooltip>}>
// 					<i className={`ti ti-${item.icon} menu-icon`} />
// 					</OverlayTrigger>
// 				</NavLink>
// 			</NavItem>
//             ))}
//           </Nav>
//         </SimpleBar>
//       </div>
//     </div>
//   );
// };

// export default IconMenu;


// import { useState, useCallback } from 'react';
// import { Nav, NavItem, NavLink, OverlayTrigger, Tooltip } from 'react-bootstrap';
// import { Link, useNavigate } from 'react-router-dom';
// import SimpleBar from 'simplebar-react';
// import 'simplebar-react/dist/simplebar.min.css';
// import logoSm from '@/assets/images/logo-sm.png';

// const IconMenu = ({ menuItems }) => {
//   const navigate = useNavigate();
//   const [activeIndex, setActiveIndex] = useState(null);

//   // Stable function reference to avoid unnecessary re-renders
//   const activeMenuItems = useCallback((idx, url) => {
//     console.log("Active menu index changed:", idx); // Debugging
//     setActiveIndex(idx);
//     navigate(url); // Ensures proper navigation in production
//   }, [navigate]);

//   return (
//     <div className="main-icon-menu">
//       <Link to="/dashboard/" className="logo logo-metrica d-block text-center">
//         <span>
//           <img src={logoSm} alt="logo-small" className="logo-sm" />
//         </span>
//       </Link>
//       <div className="main-icon-menu-body">
//         <SimpleBar className="position-relative h-100" data-simplebar>
//           <Nav className="nav nav-tabs" role="tablist" id="tab-menu">
//             {(menuItems || []).map((item, idx) => (
//               <NavItem key={idx}>
//                 <NavLink
//                   as="button"
//                   className={activeIndex === idx ? 'active' : ''}
//                   onClick={() => activeMenuItems(idx, item.url)}
//                 >
//                   <OverlayTrigger placement="right" trigger="focus" overlay={<Tooltip>{item.label}</Tooltip>}>
//                     <i className={`ti ti-${item.icon} menu-icon`} />
//                   </OverlayTrigger>
//                 </NavLink>
//               </NavItem>
//             ))}
//           </Nav>
//         </SimpleBar>
//       </div>
//     </div>
//   );
// };

// export default IconMenu;

// import { useState, useEffect, useCallback } from 'react';
// import { Nav, NavItem, NavLink, OverlayTrigger, Tooltip } from 'react-bootstrap';
// import { useNavigate, useLocation } from 'react-router-dom';
// import SimpleBar from 'simplebar-react';
// import 'simplebar-react/dist/simplebar.min.css';
// import logoSm from '@/assets/images/logo-sm.png';

// const IconMenu = ({ menuItems }) => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [activeIndex, setActiveIndex] = useState(null);

//   // Set active index based on current URL on page load
//   useEffect(() => {
//     const currentPath = location.pathname;
//     const foundIndex = menuItems.findIndex(item => item.url === currentPath);
//     if (foundIndex !== -1) {
//       setActiveIndex(foundIndex);
//     }
//   }, [location.pathname, menuItems]);

//   // Function to handle menu clicks
//   const = useCallback((idx, url) => {
//     setActiveIndex(idx);
//     navigate(url);
//   }, [navigate]);

//   return (
//     <div className="main-icon-menu">
//       <NavLink to="/dashboard/" className="logo logo-metrica d-block text-center">
//         <span>
//           <img src={logoSm} alt="logo-small" className="logo-sm" /><h4 className='text-white'>Time Sheet</h4>
          
//         </span>
//       </NavLink>
//       <div className="main-icon-menu-body">
//         <SimpleBar className="position-relative h-100" data-simplebar>
//           <Nav className="nav nav-tabs" role="tablist" id="tab-menu">
//             {(menuItems || []).map((item, idx) => (
//               <NavItem key={idx}>
//                 <NavLink
//                   as="button"
//                   className={activeIndex === idx ? 'active' : ''}
//                   onClick={() => activeMenuItems(idx, item.url)}
//                 >
//                     <i className={`ti ti-${item.icon} menu-icon`} />
                 
//                   <span className='text-white'>{item.label}</span>
//                 </NavLink>
                
//               </NavItem>
//             ))}
//           </Nav>
//         </SimpleBar>
//       </div>
//     </div>
//   );
// };

// export default IconMenu;


// import { useState, useEffect, useCallback } from 'react';
// import { Nav, NavItem, NavLink, OverlayTrigger, Tooltip } from 'react-bootstrap';
// import { useNavigate, useLocation } from 'react-router-dom';
// import SimpleBar from 'simplebar-react';
// import 'simplebar-react/dist/simplebar.min.css';
// import logoSm from '@/assets/images/logo-sm.png';

// const IconMenu = ({ menuItems }) => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [activeIndex, setActiveIndex] = useState(null);

//   // Set active index based on current URL on page load
//   useEffect(() => {
//     const currentPath = location.pathname;
//     const foundIndex = menuItems.findIndex(item => item.url === currentPath);
//     if (foundIndex !== -1) {
//       setActiveIndex(foundIndex);
//     }
//   }, [location.pathname, menuItems]);

//   // Function to handle menu clicks
//   const activeMenuItems = useCallback((idx, url) => {
//     setActiveIndex(idx);
//     navigate(url);
//   }, [navigate]);

//   return (
//     <div className="main-icon-menu">
//       {/* Logo Section */}
//       <NavLink to="/dashboard/" className="logo logo-metrica d-flex align-items-center rjustify-content-cente py-3">
//         <img src={logoSm} alt="logo-small" className="logo-sm me-2" />
//         <h4 className="text-white mb-0">Time Sheet</h4>
//       </NavLink>

//       {/* Menu Section */}
//       <div className="menu">
//         <SimpleBar className="position-relative h-100" data-simplebar>
//           <Nav className="nav nav-tabs flex-column" role="tablist" id="tab-menu">
//             {(menuItems || []).map((item, idx) => (
//               <NavItem key={idx}>
//                 <NavLink
//                   className={`d-flex align-items-center px-3 py-2 w-100 text-decoration-none ${activeIndex === idx ? 'active' : ''}`}
//                   onClick={() => activeMenuItems(idx, item.url)}
//                   style={{ cursor: 'pointer' }}
//                 >
//                   {/* Icon (Fixed Width for Alignment) */}
//                   <i className={`ti ti-${item.icon} menu-icon me-3`} style={{ width: "24px", textAlign: "center" }} />

//                   {/* Label */}
//                   <span className="flex-grow-1">{item.label}</span>
//                 </NavLink>
//               </NavItem>
//             ))}
//           </Nav>
//         </SimpleBar>
//       </div>
//     </div>
//   );
// };

// export default IconMenu;
import { useState, useEffect, useCallback } from 'react';
import { Nav, NavItem, NavLink } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import logoSm from '../../assets/images/cb.png';
import lap from '../../assets/images/Lap.png'
import styles from './App.module.css';

const IconMenu = ({ menuItems }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeIndex, setActiveIndex] = useState(null);

  // Set active index based on current URL on page load
  useEffect(() => {
    const currentPath = location.pathname;
    const foundIndex = menuItems.findIndex((item) => item.url === currentPath);
    if (foundIndex !== -1) {
      setActiveIndex(foundIndex);
    }
  }, [location.pathname, menuItems]);

  // Function to handle menu clicks
  const activeMenuItems = useCallback(
    (idx, url) => {
      setActiveIndex(idx);
      navigate(url);
    },
    [navigate]
  );

  return (
    <div className="main-icon-menu d-flex flex-column h-100">
      <NavLink to="/dashboard/" className="logo logo-metrica d-block text-center">
        <span>
          <img src={logoSm} alt="logo-small" className="logo-sm" />
          <h4 className="text-white">Time Sheet</h4>
        </span>
      </NavLink>

      <div className="menu mt-4 flex-grow-1">
        <SimpleBar className="position-relative h-100" data-simplebar>
          <Nav className="nav flex-column border-0" role="tablist" id="tab-menu">
            {(menuItems || []).map((item, idx) => (
              <NavItem key={idx}>
                <NavLink
                  className={`${styles.siberBar} d-flex align-items-center px-3 py-2 text-decoration-none`}
                  onClick={() => activeMenuItems(idx, item.url)}
                >
                  <div className={`${styles.iconContainer} ${activeIndex === idx ? styles.activeIcon : ''}`}>
                    <i className={`ti ti-${item.icon} menu-icon me-1 ${styles.icon}`} />
                    <span className="flex-grow-1 w-100 mt-1">{item.label}</span>
                  </div>
                </NavLink>
              </NavItem>
            ))}
          </Nav>
        </SimpleBar>
      </div>

      <div className="text-center p-2">
        <img src={lap} alt="logo-small" className={`logo-sm ${styles.imgView}`} />
      </div>
    </div>
  );
};

export default IconMenu;



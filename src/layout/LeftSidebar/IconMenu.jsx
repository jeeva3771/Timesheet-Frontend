// import { useState, useEffect, useCallback, useMemo } from 'react';
// import { Nav, NavItem, NavLink } from 'react-bootstrap';
// import { useNavigate, useLocation } from 'react-router-dom';
// import SimpleBar from 'simplebar-react';
// import 'simplebar-react/dist/simplebar.min.css';
// import logoSm from '../../assets/images/cb.png';
// import lap from '../../assets/images/Lap.png'
// import styles from './App.module.css';
// import {
//   adminMenu,
//   managerMenu,
//   hrAndEmployeeMenu
// } from '@/common/roleMenu'

// const IconMenu = ({ menuItems }) => {
//   const navigate = useNavigate()
//   const location = useLocation()
//   const [activeIndex, setActiveIndex] = useState(null)

//   const role = JSON.parse(localStorage.getItem('role')) || ''

//   // Filter menu items based on role
//   const filteredMenuItems = useMemo(() => {
//     switch (role) {
//       case 'admin':
//         return menuItems.filter(item =>
//           adminMenu.includes(item.url)
//         )
//       case 'manager':
//         return menuItems.filter(item =>
//           managerMenu.includes(item.url)
//         )
//       case 'hr':
//       case 'employee':
//         return menuItems.filter(item =>
//           hrAndEmployeeMenu.includes(item.url)
//         )
//       default:
//         return [];
//     }
//   }, [menuItems, role])

//   // Set active menu item based on current path - modified to handle sub-paths
//   useEffect(() => {
//     const currentPath = location.pathname
//     // Find if current path starts with any menu item url
//     const foundIndex = filteredMenuItems.findIndex(item => 
//       currentPath === item.url || // Exact match
//       (currentPath.startsWith(item.url) && 
//        (item.url !== '/' || currentPath === '/')) // Starts with and prevents '/' from matching everything
//     )
    
//     if (foundIndex !== -1) {
//       setActiveIndex(foundIndex)
//     }
//   }, [location.pathname, filteredMenuItems])

//   // Handle menu click
//   const activeMenuItems = useCallback(
//     (idx, url) => {
//       setActiveIndex(idx)
//       navigate(url)
//     },
//     [navigate]
//   )

//   return (
//     <div className="main-icon-menu d-flex flex-column h-100">
//       <NavLink to="/dashboard/" className="logo logo-metrica d-block text-center">
//         <span>
//           <img src={logoSm} alt="logo-small" className="logo-sm" />
//           <h4 className="text-white">Time Sheet</h4>
//         </span>
//       </NavLink>

//       <div className="menu mt-4 flex-grow-1">
//         <SimpleBar className="position-relative h-100" data-simplebar>
//           <Nav className="nav flex-column border-0" role="tablist" id="tab-menu">
//             {(filteredMenuItems || []).map((item, idx) => (
//               <NavItem key={idx}>
//                 <NavLink
//                   className={`${styles.siberBar} d-flex align-items-center px-3 py-2 text-decoration-none`}
//                   onClick={() => activeMenuItems(idx, item.url)}
//                 >
//                   <div className={`${styles.iconContainer} ${activeIndex === idx ? styles.activeIcon : ''}`}>
//                     <i className={`ti ti-${item.icon} menu-icon me-1 ${styles.icon}`} />
//                     <span className="flex-grow-1 w-100 mt-1" style={{ whiteSpace: "nowrap" }}>{item.label}</span>
//                   </div>
//                 </NavLink>
//               </NavItem>
//             ))}
//           </Nav>
//         </SimpleBar>
//       </div>

//       <div className="text-center p-2">
//         <img src={lap} alt="logo-small" className={`logo-sm ${styles.imgView}`} />
//       </div>
//     </div>
//   );
// };

// export default IconMenu;



import { useState, useEffect, useCallback, useMemo } from 'react';
import { Nav, NavItem, NavLink } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import logoSm from '../../assets/images/cb.png';
import lap from '../../assets/images/Lap.png'
import styles from './App.module.css';
import {
  adminMenu,
  managerMenu,
  hrAndEmployeeMenu
} from '@/common/roleMenu'

const IconMenu = ({ menuItems }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const [activeIndex, setActiveIndex] = useState(null)

  const role = JSON.parse(localStorage.getItem('role')) || ''

  // Filter menu items based on role
  const filteredMenuItems = useMemo(() => {
    switch (role) {
      case 'admin':
        return menuItems.filter(item =>
          adminMenu.includes(item.url)
        )
      case 'manager':
        return menuItems.filter(item =>
          managerMenu.includes(item.url)
        )
      case 'hr':
      case 'employee':
        return menuItems.filter(item =>
          hrAndEmployeeMenu.includes(item.url)
        )
      default:
        return [];
    }
  }, [menuItems, role])

  // Set active menu item based on current path
  useEffect(() => {
    const currentPath = location.pathname

    const isProfilePath = currentPath === '/profile/' || currentPath.startsWith('/profile/')
    
    // If we're on a profile path, don't highlight any menu item
    if (isProfilePath) {
      setActiveIndex(null)
      return
    }
    
    // Check if current path is related to projects or history
    const isProjectsPath = currentPath.startsWith('/projects/')
    const isHistoryPath = currentPath.startsWith('/history/')
    
    // Find the matching menu item
    const foundIndex = filteredMenuItems.findIndex(item => {
      // For exact matches
      if (currentPath === item.url) return true
      
      // Handle root path special case
      if (item.url === '/' && currentPath !== '/') return false
      
      // Special handling for projects and history
      if (item.url === '/projects/' && (isProjectsPath || isHistoryPath)) return true
      if (item.url === '/history/' && (isProjectsPath || isHistoryPath)) return true
      
      // For other items, check if current path starts with item url
      return currentPath.startsWith(item.url)
    })
    
    if (foundIndex !== -1) {
      setActiveIndex(foundIndex)
    }
  }, [location.pathname, filteredMenuItems])

  // Handle menu item clicks
  const activeMenuItems = useCallback(
    (idx, url) => {
      setActiveIndex(idx)
      
      // Special handling for projects and history navigation
      if (url === '/history/' && location.pathname.startsWith('/projects/')) {
        // If we're in a projects path and clicking history, navigate relatively
        navigate('/history/');  // Navigate to the history root path
      } else if (url === '/projects/' && location.pathname.startsWith('/history/')) {
        // If we're in a history path and clicking projects, navigate to projects
        navigate('/projects/'); // Navigate to the projects root path
      } else {
        // Normal navigation for other routes
        navigate(url)
      }
    },
    [navigate, location.pathname]
  )

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
            {(filteredMenuItems || []).map((item, idx) => (
              <NavItem key={idx}>
                <NavLink
                  className={`${styles.siberBar} d-flex align-items-center px-3 py-2 text-decoration-none`}
                  onClick={() => activeMenuItems(idx, item.url)}
                >
                  <div className={`${styles.iconContainer} ${activeIndex === idx ? styles.activeIcon : ''}`}>
                    <i className={`ti ti-${item.icon} menu-icon me-1 ${styles.icon}`} />
                    <span className="flex-grow-1 w-100 mt-1" style={{ whiteSpace: "nowrap" }}>{item.label}</span>
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
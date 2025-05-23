import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { TabContainer } from 'react-bootstrap'
import { getTwoColumnMenuItems } from '@/common/menu'
import IconMenu from './IconMenu'
// import MainMenu from './MainMenu';

const LeftSidebar = () => {
  const menuItems = getTwoColumnMenuItems()
  const location = useLocation()
  const [activeTabKey, setActiveTabKey] = useState('0')

  useEffect(() => {
    const navLink = document.querySelectorAll('.side-nav-link-ref')
    const navArray = [...navLink]
    const matchingMenuItem = navArray.find(x => x.pathname === location.pathname)
    const keyId = matchingMenuItem?.closest('.tab-pane')?.getAttribute('id')
    const activeKey = keyId?.split('-').slice(-1).toString()
    setActiveTabKey(activeKey)
  }, [location.pathname])

  return (
    <div className="leftbar-tab-menu">
      <TabContainer activeKey={activeTabKey} defaultActiveKey={0}>
        <IconMenu menuItems={menuItems} activeMenuItems={setActiveTabKey} />
        {/* <MainMenu menuItems={menuItems} /> */}
      </TabContainer>
    </div>
  )
}

export default LeftSidebar

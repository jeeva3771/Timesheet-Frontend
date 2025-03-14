import { Link } from 'react-router-dom';

const MenuItem = ({ item, activeMenuItems }) => {
  return (
    <li className={`nav-item ${activeMenuItems.includes(item.key) ? 'menuitem-active' : ''}`}>
      <Link to={item.url} className={`nav-link ${activeMenuItems.includes(item.key) ? 'active' : ''}`} data-menu-key={item.key}>
        {item.icon && <i className={`ti ti-${item.icon} menu-icon`} />}
        {item.label}
      </Link>
    </li>
  );
};

export default MenuItem;

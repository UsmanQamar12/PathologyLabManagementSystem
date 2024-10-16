import React, { useState } from 'react';
import '../pages/CSS/Sidebar.css'
import { FaBars,   FaClipboardCheck,  FaClipboardList, FaTh, FaThList, FaUserAlt,FaPoll,FaCalculator} from 'react-icons/fa';
import { NavLink } from 'react-router-dom';


const Sidebar = ({ children }) => {
  const[isOpen,setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const menuItems = [
    {
      path: '/dashboard',
      name: 'Dashboard',
      icon: <FaTh />,
    },
    {
      path: '/newpatient',
      name: 'New Patient',
      icon: <FaUserAlt />,
    },
    {
      path: '/Addtest',
      name: 'Add Test',
      icon: <FaClipboardCheck />,
    },
    
    {
      path: '/reports',
      name: 'Reports',
      icon: <FaThList />,
    },
    // {
    //   path: '/billing',
    //   name: 'Billing',
    //   icon: <FaCalculator/>,
    // },
    // {
    //   path: '/accounts',
    //   name: 'Accounts',
    //   icon: < FaPoll />,
    // },
    // {
    //   path: '/ratelist',
    //   name: 'Rate List',
    //   icon: < FaClipboardList />,
    // },
  ];

  return (
    <div className="container-main">
      <div style={{width:isOpen?"350px":"70px"}}className="sidebar-main">
        <div className="top-section">
          <h1  style={{display:isOpen?"block":"none"}} className="logo">LAB CLOUD</h1>
          <div  style={{marginLeft:isOpen?"50px":"0px"}} className="bars">
            <FaBars onClick={toggle} />
          </div>
        </div>
        <nav>
          {menuItems.map((item, index) => (
            <NavLink to={item.path} key={index} className="link-main" activeClassName="active">
              <div className="icon">{item.icon}</div>
              <div style={{display:isOpen?"block":"none"}} className="link_text">{item.name}</div>
            </NavLink>
          ))}
        </nav>
      </div>
      <main>{children}</main>
    </div>
  );
};

export default Sidebar;

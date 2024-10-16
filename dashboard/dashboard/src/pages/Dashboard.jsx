import React from 'react';
import dashboard from '../images/dashboard.jpg';
import '../pages/CSS/Dashboard.css';

const Dashboard =()=> {
  return (
    <div className='dashboard'>
    <img style={{height:'100vh'}} src={dashboard} alt="" />
    
    </div>
  )
}

export default Dashboard
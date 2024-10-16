import React from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Newpatient from './pages/Newpatient';
import Invoice from './pages/Addtest';
import Ratelist from './pages/Ratelist';
import Billing from './pages/Billing';
import Accounts from './pages/Accounts';
import Reports from './pages/ReportForm';
import Addtest from './pages/Addtest';


function App() {
  return (
    <BrowserRouter>
      
        <Sidebar>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/newpatient" element={<Newpatient />} />
          <Route path="/Addtest" element={<Addtest />} />
          
          <Route path="/reports" element={<Reports />} />
          <Route path="/billing" element={<Billing />} />
          <Route path="/ratelist" element={<Ratelist />} />
          <Route path="/accounts" element={<Accounts />} />
        </Routes>
        </Sidebar>
      
    </BrowserRouter>
  );
}

export default App;

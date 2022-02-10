import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Shared/Layout/Layout';
import LandingPage from './pages/LandingPage/LandingPage';
import LoginPage from './pages/Login/LoginPage';
import DronesList from './pages/DronesList/DronesList';
import DroneDetail from './pages/DroneDetail/DroneDetail';
import SigninPage from './pages/SignIn/SignInPage';
import FAQs from './pages/FAQs/FAQs';
import DronCreation from './pages/admin/CreateDron/DronCreation';
import AdminLayout from './components/Shared/Layout/AdminLayout';
import Drones from './pages/admin/Drones/Drones';
import Dashboard from './pages/admin/Dashboard/Dashboard';
import UserProfile from './pages/UserProfile/UserProfile';
import Orders from './pages/admin/Orders/Orders';

function App() {
  return (
    <Routes>
      <Route path="admin" element={<AdminLayout />}>
        <Route path="crear-dron" element={<DronCreation />} />
        <Route path="drones" element={<Drones />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="orders" element={<Orders />} />
      </Route>
      <Route element={<Layout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="signin" element={<SigninPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="profile" element={<UserProfile />} />
        <Route path="registrar" element={<SigninPage />} />
        <Route path="iniciar-sesion" element={<LoginPage />} />
        <Route path="faqs" element={<FAQs />} />
        <Route path="drones" element={<DronesList />} />
        <Route path="drones/:reference" element={<DroneDetail />} />
      </Route>
    </Routes>
  );
}

export default App;

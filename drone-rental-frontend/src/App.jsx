import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Shared/Layout/Layout';
import LandingPage from './pages/LandingPage/LandingPage';
import LoginPage from './pages/Login/LoginPage';
import DronesList from './pages/DronesList/DronesList';
import SigninPage from './pages/SignIn/SignInPage';
import FAQs from './pages/FAQs/FAQs';
import CreateDron from './pages/CreateDron/CreateDron';
import AdminLayout from './components/Shared/Layout/AdminLayout';
import AdminDrones from './pages/AdminDrones/AdminDrones';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';
import UserProfile from './pages/UserProfile/UserProfile';

function App() {
  return (
    <Routes>
      <Route path="admin" element={<AdminLayout />}>
        <Route path="crear-dron" element={<CreateDron />} />
        <Route path="drones" element={<AdminDrones />} />
        <Route path="dashboard" element={<AdminDashboard />} />
      </Route>
      <Route element={<Layout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/registrar" element={<SigninPage />} />
        <Route path="/iniciar-sesion" element={<LoginPage />} />
        <Route path="/drones" element={<DronesList />} />
        <Route path="/faqs" element={<FAQs />} />
      </Route>
    </Routes>
  );
}

export default App;

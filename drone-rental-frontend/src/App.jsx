import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Shared/Layout/Layout';
import LandingPage from './pages/LandingPage/LandingPage';
import LoginPage from './pages/Login/LoginPage';
import DronesList from './pages/DronesList/DronesList';
import SigninPage from './pages/Signin/SigninPage';
import FAQs from './pages/FAQs/FAQs';
import CreateDron from './pages/CreateDron/CreateDron';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';
import UserProfile from './pages/UserProfile/UserProfile';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/droneslist" element={<DronesList />} />
        <Route path="/faqs" element={<FAQs />} />
        <Route path="/create-dron" element={<CreateDron />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </Layout>
  );
}

export default App;

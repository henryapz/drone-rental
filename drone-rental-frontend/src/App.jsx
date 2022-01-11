import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Shared/Layout/Layout';
import LandingPage from './pages/LandingPage/LandingPage';
import LoginPage from './pages/Login/LoginPage';
import DronesList from './pages/DronesList/DronesList';
import SignInPage from './pages/SignIn/SignInPage';
import FAQs from './pages/FAQs/FAQs';
import CreateDron from './pages/CreateDron/CreateDron';
import AdminLayout from './components/Shared/Layout/AdminLayout';
import AdminDrones from './pages/AdminDrones/AdminDrones';

function App() {
  return (
    <Routes>
      <Route path="admin" element={<AdminLayout />}>
        <Route path="create-dron" element={<CreateDron />} />
        <Route path="drones" element={<AdminDrones />} />
      </Route>
      <Route element={<Layout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/droneslist" element={<DronesList />} />
        <Route path="/faqs" element={<FAQs />} />
      </Route>
    </Routes>
  );
}

export default App;

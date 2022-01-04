import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Shared/Layout/Layout';
import LandingPage from './pages/LandingPage/LandingPage';
import LoginPage from './pages/Login/LoginPage';
import DronesList from './pages/DronesList/DronesList';
import SigninPage from './pages/Signin/SigninPage';
import FAQs from './pages/FAQs/FAQs';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/droneslist" element={<DronesList />} />
        <Route path="/faqs" element={<FAQs />} />
      </Routes>
    </Layout>
  );
}

export default App;

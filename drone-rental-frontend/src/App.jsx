import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Shared/Layout/Layout';
import LandingPage from './pages/LandingPage/LandingPage';
import SigninPage from './pages/Signin/SigninPage';
import LoginPage from './pages/Login/LoginPage';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Layout>
  );
}

export default App;

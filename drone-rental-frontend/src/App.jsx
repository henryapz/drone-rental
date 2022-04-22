import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { getAllCategories } from './app/slices/categoriesSlice';
import { getAllDrones } from './app/slices/dronesSlice';
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
import Checkout from './pages/Checkout/Checkout';
import CategoryDetail from './pages/CategoryDetail/CategoryDetail';
import NotFound from './components/Shared/NotFound/NotFound';
import Orders from './pages/admin/Orders/Orders';

function App() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.userData);

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllDrones());
  }, [dispatch]);

  return (
    <Routes>
      <Route
        path="admin"
        element={<AdminLayout isAllowed={!!user && user.role === 'Admin'} />}
      >
        <Route path="login" element={<LoginPage />} />
        <Route path="crear-dron" element={<DronCreation />} />
        <Route path="drones" element={<Drones />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="orders" element={<Orders />} />
      </Route>
      <Route element={<Layout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="profile" element={<UserProfile />} />
        <Route path="registrar" element={<SigninPage />} />
        <Route path="iniciar-sesion" element={<LoginPage />} />
        <Route path="faqs" element={<FAQs />} />
        <Route path="drones/" element={<DronesList />} />
        <Route path="drones/:reference" element={<DroneDetail />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="categoria/:name" element={<CategoryDetail />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;

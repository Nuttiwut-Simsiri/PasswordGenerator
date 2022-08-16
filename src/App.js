import React, { useState } from 'react'
import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";
import HomePage from './pages/HomePage';
import MyPwPage from './pages/MyPwPage';
import RegisterPage from './pages/RegisterPage';

export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/mypassword" element={<MyPwPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}
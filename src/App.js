import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Importation de React Router

import './index.css';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage'; 
import Chatbot from './pages/Chatbot'; 
import AboutPage from './pages/AboutPage'; 
import LoginPage from './pages/LoginPage'; 
import Register from './pages/Register'; 

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* Header commun à toutes les pages */}
        <Header />

        {/* Contenu principal */}
        <main className="flex-grow container mx-auto p-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/chatbot" element={<Chatbot />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>

        {/* Footer commun */}
        <Footer />
      </div>
    </Router>
  );
};

export default App;

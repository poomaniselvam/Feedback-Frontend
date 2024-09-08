// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home'; // Import the Home component
import View from './components/View'; // Import the View component
import RatingTable from './components/RatingTable'; // Import the RatingTable component
import Header from './components/Header'; // Fixed casing for Header component import
import NavbarDisplay from './components/Navbardisplay'; // Fixed casing for NavbarDisplay component import
import QuestionsManager from './components/QuestionsManager'; // Import the QuestionsManager component
import Bgcolor from './components/Bgcolor';
import Background from './components/Background';
import AdminLogin from './components/AdminLogin';

function App() {
  return (
    <Router>
      <NavbarDisplay />
      <Bgcolor />
      <Routes>
        <Route path="/" element={<Home />} /> {/* Home route */}
        <Route path="/rating-table" element={<RatingTable />} /> {/* RatingTable route */}
        <Route path="/view" element={<View />} /> {/* View route */}
        <Route path="/header" element={<Header />} /> {/* Header route */}
        <Route path="/question" element={<QuestionsManager />} /> {/* QuestionsManager route */}
          <Route path="/background" element={<Background />} /> {/* QuestionsManager route */}
            <Route path= "/admin"element={<AdminLogin />} /> 
      </Routes>
    </Router>
  );
}

export default App;
                                                                                   
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Notepage from './pages/NotePage/Notepage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/notes/:id" element={<Notepage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

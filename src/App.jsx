
import Home from './components/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import DashboardPage from './Pages/DashboardPage';
import Baby from './Pages/Baby';
import Birthday from './Pages/Birthday';
import PreWedding from './Pages/PreWedding';
import Wedding from './Pages/Wedding';
import EngagementGallery from './Pages/EngagementGallery';
import VideoPage from './Pages/VideoPage';
import { useState } from 'react';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage setToken={setToken} />} />
        <Route path="/dashboard" element={<DashboardPage token={token} />} />
        <Route path="/" element={<Home />} />
        <Route path="/baby" element={<Baby />} />
        <Route path="/birthday" element={<Birthday />} />
        <Route path="/prewedding" element={<PreWedding />} />
        <Route path="/wedding" element={<Wedding />} />
        <Route path="/engagement" element={<EngagementGallery />} />
        <Route path="/videos" element={<VideoPage/>} />
      </Routes>
    </Router>
  );
}

export default App;

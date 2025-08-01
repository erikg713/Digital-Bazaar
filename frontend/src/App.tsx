import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import CreatorDashboard from './pages/CreatorDashboard';
import Marketplace from './pages/Marketplace';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/creator" element={<CreatorDashboard />} />
        <Route path="/marketplace" element={<Marketplace />} />
      </Routes>
    </Router>
  );
}

export default App;

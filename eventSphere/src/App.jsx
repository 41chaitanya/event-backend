import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { AuthProvider } from './contexts/AuthContext';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import NewEvent from './pages/NewEvent';
import EventDetail from './pages/EventDetail';

// Components
import PrivateRoute from './components/PrivateRoute';
function App() {
  const [count, setCount] = useState(0);

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/events/:id" element={<EventDetail />} />
          
          {/* Protected routes */}
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/new-event" element={<NewEvent />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

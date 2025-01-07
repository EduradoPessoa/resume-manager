import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// Pages
import LandingPage from './pages/LandingPage'
import Login from './pages/Login'
import Register from './pages/Register'
import EditResume from './pages/EditResume'
import ViewResume from './pages/ViewResume'
import ResumeList from './pages/ResumeList'
import NewResume from './pages/NewResume'
import Upgrade from './pages/Upgrade'

// Components
import PrivateRoute from './components/PrivateRoute'

// Context
import { AuthProvider } from './contexts/AuthContext'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/upgrade" element={<Upgrade />} />

            {/* Protected Routes */}
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <ResumeList />
                </PrivateRoute>
              }
            />
            <Route
              path="/new"
              element={
                <PrivateRoute>
                  <NewResume />
                </PrivateRoute>
              }
            />
            <Route
              path="/edit/:id"
              element={
                <PrivateRoute>
                  <EditResume />
                </PrivateRoute>
              }
            />
            <Route
              path="/view/:id"
              element={
                <PrivateRoute>
                  <ViewResume />
                </PrivateRoute>
              }
            />

            {/* Fallback */}
            <Route path="*" element={<LandingPage />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { theme } from './styles/theme'

// Pages
import Home from './pages/Home'
import CreateResume from './pages/CreateResume'
import EditResume from './pages/EditResume'
import ViewResume from './pages/ViewResume'
import NotFound from './pages/NotFound'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CreateResume />} />
            <Route path="/edit/:id" element={<EditResume />} />
            <Route path="/view/:id" element={<ViewResume />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App

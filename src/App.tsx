import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material'

// Pages
import EditResume from './pages/EditResume'
import ViewResume from './pages/ViewResume'
import ResumeList from './pages/ResumeList'
import NewResume from './pages/NewResume'

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2563eb',
    },
    background: {
      default: '#f3f4f6',
    },
  },
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Routes>
            <Route path="/" element={<ResumeList />} />
            <Route path="/new" element={<NewResume />} />
            <Route path="/edit/:id" element={<EditResume />} />
            <Route path="/view/:id" element={<ViewResume />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App

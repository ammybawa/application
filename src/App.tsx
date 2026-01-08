import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import ApplicationOnboarding from './pages/ApplicationOnboarding'
import Applications from './pages/Applications'
import Profile from './pages/Profile'
import Questionnaire from './pages/Questionnaire'
import OnboardingRequirements from './pages/OnboardingRequirements'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/applications" element={<Applications />} />
          <Route path="/application-onboarding" element={<ApplicationOnboarding />} />
          <Route path="/onboarding-requirements" element={<OnboardingRequirements />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/questionnaire" element={<Questionnaire />} />
          <Route path="/questionnaire/:appId" element={<Questionnaire />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App

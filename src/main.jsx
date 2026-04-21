import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import AboutPage from './pages/AboutPage.jsx'
import ContactPage from './pages/ContactPage.jsx'
import ProjectsPage from './pages/ProjectsPage.jsx'
import AchievementsPage from './pages/AchievementsPage.jsx'
import ResumePage from './pages/ResumePage.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/#/about"    element={<AboutPage />} />
        <Route path="/contact"  element={<ContactPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/achievements"   element={<AchievementsPage />} />
        <Route path="/resume"   element={<ResumePage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
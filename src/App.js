import './App.css';
import React from 'react';
import { Routes, Route, HashRouter as Router } from 'react-router-dom';
import LandingPage from './LandingPage';
import ProjectsPage from './Pages/ProjectsPage';
import AwardsPage from './Pages/AwardsPage';
import CareerPage from './Pages/CareerPage';
import EducationPage from './Pages/EducationPage';
import SkillsPage from './Pages/SkillsPage';
import CertificationsPage from './Pages/CertificationsPage';

function App() {

    return (
        <div className="App" >
            <Router basename="/">
                <Routes>
                    <Route path='/' element={<LandingPage Load={true} />} />
                    <Route path='/mainPage' element={<LandingPage Load={false} />} />
                    <Route path='/projects' element={<ProjectsPage />} />
                    <Route path='/awards' element={<AwardsPage />} />
                    <Route path='/career' element={<CareerPage />} />
                    <Route path='/education' element={<EducationPage />} />
                    <Route path='/skills' element={<SkillsPage />} />
                    <Route path='/certifications' element={<CertificationsPage />} />
                </Routes>
            </Router>
        </div>);
}

export default App;
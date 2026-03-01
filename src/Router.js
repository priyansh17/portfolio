import React from 'react'
import { Routes, Route, HashRouter as Router } from 'react-router-dom';
import LandingPage from './LandingPage';
import ProjectsPage from './Pages/ProjectsPage';
import AwardsPage from './Pages/AwardsPage';
import CareerPage from './Pages/CareerPage';
import EducationPage from './Pages/EducationPage';
import SkillsPage from './Pages/SkillsPage';

export default function RouterComponent() {
    return (
        <div>
            <Router basename="/">
                <Routes>
                    <Route path='/' element={<LandingPage />} />
                    <Route path='/mainPage' element={<LandingPage />} />
                    <Route path='/projects' element={<ProjectsPage />} />
                    <Route path='/awards' element={<AwardsPage />} />
                    <Route path='/career' element={<CareerPage />} />
                    <Route path='/education' element={<EducationPage />} />
                    <Route path='/skills' element={<SkillsPage />} />
                </Routes>
            </Router>
        </div>
    )
}

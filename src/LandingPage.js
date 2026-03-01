import React from 'react';
import MainPage from './MainPage';
import Navbar from './Navbar';

function LandingPage() {
    window.history.replaceState(null, "Homepage", "/portfolio/");

    return (
        <div>
            <Navbar />
            <MainPage />
        </div>
    );
}

export default LandingPage;

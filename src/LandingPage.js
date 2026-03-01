import React from 'react';
import MainPage from './MainPage';
import Navbar from './Navbar';
import ThreeBackground from './ThreeBackground';

function LandingPage(props) {
    window.history.replaceState(null, "Homepage", "/portfolio/");

    return (
        <div className='landingWrapper'>
            <ThreeBackground />
            <div style={{ position: 'relative', zIndex: 1 }}>
                <Navbar />
                <MainPage />
            </div>
        </div>
    );
}

export default LandingPage;
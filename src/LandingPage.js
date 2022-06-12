import React, { useState, useEffect } from 'react';
import MainPage from './MainPage';
import bgVideo1 from './media/bg1.mp4'
import { Container } from 'react-bootstrap';
import bgVideo2 from './media/bgIntro.mp4'
import Pacman from './Pacman';

function LandingPage(props) {

    const [load, setLoad] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoad(false)
        }, 4500)
    }, [])


    return (<div>
        {
            load ?
                <Container fluid>
                    <video className='videoTag' autoPlay loop muted>
                        <source src={bgVideo2} type='video/mp4' />
                    </video>
                    <div className="welcomeText" >
                        <span className='spans'> <h1 className='h1-upper'> Loading... <br /> Welcome to my website. </h1></span>
                    </div>
                    <Pacman Load={load} />
                </Container> :
                <Container fluid>
                    <div></div>
                    <video className='videoTag' style={{ filter: "brightness(70%)" }} autoPlay loop muted>
                        <source src={bgVideo1} type='video/mp4' />
                    </video>
                    <div className='mainPage'>
                        <MainPage />
                    </div>
                </Container>
        }</div>
    );
}

export default LandingPage;
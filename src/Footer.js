import './App.css';
import React, { useState, useEffect } from 'react';
import staticData from './stringConst';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComputer, faHeartbeat, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faGithub, faFacebook, faLinkedin, faDiscord, faYoutube, faInstagram } from '@fortawesome/free-brands-svg-icons';

function Footer(props) {

    const [visits, setVisits] = useState(0);
    const [likes, setLikes] = useState(0);

    const fetchVisitCounts = async () => {
        await fetch('https://api.countapi.xyz/update/PriyanshChoudhary17/im1706/?amount=1')
            .then((res) => res.json())
            .then((res) => setVisits(res.value));
        console.log("visit function called");
    }

    const likePage = async () => {
        await fetch('https://api.countapi.xyz/update/im1706/im1706Likes/?amount=1')
            .then((res) => res.json())
            .then((res) => setLikes(res.value));
    }

    const getLikes = async () => {
        await fetch('https://api.countapi.xyz/get/im1706/im1706Likes')
            .then((res) => res.json())
            .then((res) => setLikes(res.value));
    }

    const ConnectIcons = (icon, url, colour,index) => {
        return (
            <a key={index} href={url} target='_blank' rel="noreferrer">
                <FontAwesomeIcon style={{ width: 'auto', cursor: 'pointer', color: 'whitesmoke'}} icon={icon} size={'2x'}/>
            </a>
        )
    }

    const Icons = [faEnvelope, faLinkedin, faTwitter, faGithub, faFacebook, faDiscord, faInstagram, faYoutube];
    const urls = [staticData['email'], staticData['linkedin'], staticData['twitter'], staticData['github'], staticData['facebook'], staticData['discord'],
                    staticData['instagram'], staticData['youtube'] ]
    const colours = ['red', 'blue' , 'blue', 'white', 'blue', 'blue', 'pink', 'red']

    useEffect(() => {
        getLikes();
        fetchVisitCounts();
    }, [])

    return (
        <Container>
            <div style={{ marginTop: "3rem", padding: "0rem", marginBottom: "0rem", position: "relative" }}>
                <Row>
                    <p id='contact'>{staticData["contact"]}</p>
                </Row>
                <Row className='IconsRow'>
                    {Icons.map((info, index) => {
                        return ConnectIcons(info,urls[index],colours[index],index);
                    })}
                </Row>
            </div>
            <br />
            <Row>
                <Col xs={6}>
                    <FontAwesomeIcon icon={faComputer} size={'4x'} border />
                    <br /><br />PAGE VISITS<br />
                    <span style={{ fontSize: '3rem' }}>{visits}</span>
                </Col>
                <Col xs={6}>
                    <FontAwesomeIcon style={{ cursor: 'pointer' }} icon={faHeartbeat} size={'4x'} onClick={likePage} border />
                    <br /><br />LIKE THIS PAGE<br />
                    <span style={{ fontSize: '3rem' }}>{likes}</span>
                </Col>
            </Row>

            <br />

        </Container>
    );
}

export default Footer;
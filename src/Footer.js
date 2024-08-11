import './App.css';
import React from 'react';
import staticData from './stringConst';
import { Container, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faDownload } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faGithub, faFacebook, faLinkedin, faDiscord, faYoutube, faInstagram } from '@fortawesome/free-brands-svg-icons';
import myResume from './media/certificates/PriyanshChoudhary_Resume_2024.pdf';

function Footer(props) {
 
    const ConnectIcons = (icon, url, colour, index) => {
        return (
            <a key={index} href={url} target='_blank' rel="noreferrer">
                <FontAwesomeIcon style={{ width: 'auto', cursor: 'pointer', color: 'whitesmoke' }} icon={icon} size={'2x'} />
            </a>
        )
    }

    const Icons = [faEnvelope, faLinkedin, faTwitter, faGithub, faFacebook, faDiscord, faInstagram, faYoutube];
    const urls = [staticData['email'], staticData['linkedin'], staticData['twitter'], staticData['github'], staticData['facebook'], staticData['discord'],
    staticData['instagram'], staticData['youtube']]
    const colours = ['red', 'blue', 'blue', 'white', 'blue', 'blue', 'pink', 'red']

    return (
        <Container>
            <div style={{ marginTop: "3rem", padding: "0rem", marginBottom: "0rem", position: "relative" }}>
                <Row>
                    <p id='contact'>{staticData["contact"]}</p>
                </Row>
                <Row className='IconsRow'>
                    {Icons.map((info, index) => {
                        return ConnectIcons(info, urls[index], colours[index], index);
                    })}
                </Row>
            </div>
            <br />
            <Row style={{ justifyContent: 'center' }}>
                <a href={myResume} download='PriyanshChoudhary_Resume.pdf' style={{ width: 'auto' }}><FontAwesomeIcon icon={faDownload} size={'2x'}  border /></a>
                <p id='resume' style={{ width: 'auto' }}>Download My Resume</p>
            </Row>
            <br/>
        </Container>
    );
}

export default Footer;
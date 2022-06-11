import '../App.css';
import React from 'react';
import staticData from '../stringConst';
import { Container, Row, Col } from 'react-bootstrap';
import ProjectsCard from './ProjectsCard';
import ProjectsData from './ProjectsData';
import parse from 'html-react-parser';
import dearDiaryimage from '../media/dearDiaryProject.jpg';
import chatbotimage from '../media/chatbotsHealthcare.png';
import pgLifeimage from '../media/pgLife.png';
import handTrackingimage from '../media/hand-tracking.png';
import RestaurantAppimage from '../media/restaurant_app.jpg';
import b2bReact from '../media/b2b react app.png';

function ProjectsPage(props) {

    const images = [dearDiaryimage, chatbotimage, b2bReact, handTrackingimage, pgLifeimage, RestaurantAppimage];

    return (
        <Container>
            <Row style={{ alignItems: "center" }}>
                <p id='projectHeader'>{staticData["ProjectsPageHeading"]}</p>
            </Row>
            <Row style={{ alignItems: "center", justifyContent: "center" }}>
                {ProjectsData.map((val, ind) => {
                    return (
                        <Col key={ind} xs={12} md={6} style={{padding : "1rem"}}>
                            <ProjectsCard name={val['projectName']} date={val['projectDate']}
                                displayChar={val['projectDisplay']} image={images[ind]} desc={parse(val['projectDescription'])}
                                para1={parse(val['breifDescription1'])} para2={parse(val['breifDescription2'])} para3={parse(val['breifDescription3'])} githubUrl={val['githubUrl']} />
                        </Col>
                    );
                })}
            </Row>
        </Container>
    );
}

export default ProjectsPage;
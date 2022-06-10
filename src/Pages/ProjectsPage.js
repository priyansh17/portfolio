import '../App.css';
import React from 'react';
import staticData from '../stringConst';
import { Container, Row, Col } from 'react-bootstrap';
import ProjectsCard from './ProjectsCard';
import ProjectsData from './ProjectsData';
import parse from 'html-react-parser';
import p1image from '../media/dearDiaryProject.jpg';
import p2image from '../media/chatbotsHealthcare.png';
import p3image from '../media/pgLife.png';

function ProjectsPage(props) {

    const images = [p1image,p2image,p3image];

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
                                para1={val['breifDescription1']} para2={val['breifDescription2']} para3={val['breifDescription3']} githubUrl={val['githubUrl']} />
                        </Col>
                    );
                })}
            </Row>
        </Container>
    );
}

export default ProjectsPage;
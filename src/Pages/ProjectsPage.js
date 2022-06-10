import '../App.css';
import React from 'react';
import staticData from '../stringConst';
import { Container, Row, Col } from 'react-bootstrap';

function ProjectsPage(props) {
    return (
        <Container style={{ color: "#ffffff" }}>
        <div>
        <Row style={{alignItems : "center"}}>
            <p id='projectHeader'>{staticData["ProjectsPageHeading"]}</p>
        </Row>
      </div>
        </Container>
    );
}

export default ProjectsPage;
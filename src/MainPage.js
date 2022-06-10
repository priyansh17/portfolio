import './App.css';
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import CoverImage from './media/CoverImage.png';
import homepage from './homepageData';
import HomescreenCard from './HomescreenCard';
import career from './media/HomeScreenCards/career.png';
import education from './media/HomeScreenCards/Education.jpg';
import projetcs from './media/HomeScreenCards/projects.png';
import achievement from './media/HomeScreenCards/achievements.jpg';
import skills from './media/HomeScreenCards/skills.jpg';
import certifications from './media/HomeScreenCards/Certifications.png';
import staticData from './stringConst';
import parse from 'html-react-parser';
import Footer from './Footer';


function MainPage(props) {

  // const [show, setShow] = useState(true);
  const ImagesHomeScreen = [projetcs, education, career, achievement, skills, certifications];

  const card = (x, i) => {
    return (
      <Col xs={12} md={{ span: 4, offset: 0 }} key={i}>
        <HomescreenCard ImageSrc={ImagesHomeScreen[i]} CardTitle={x['title']} CardText={x['text']} Cardbutton={x['buttonText']} linkTo={x['link']} />
      </Col>);
  }

  return (
    <Container style={{ color: "#ffffff" }}>
      <div>
        <Row style={{alignItems : "center"}}>
          <Col xs={12} md={9}>
            <p id='nameHeader'>{staticData["name"]}</p>
            <p id='aboutMeMainpage'>{parse(staticData["about"])}</p>
          </Col>
          <Col xs={12} md={3}>
            <img className='coverImage' src={CoverImage} alt="CoverImage" />
          </Col>
        </Row>
      </div>
      <div>
        <Row className="container-fluid content-row">
          {homepage.map((x, i) => {
            if (i < 3) {
              return card(x, i);
            }
            else
              return null;
          })}
        </Row>
        <Row className="container-fluid content-row">
          {homepage.map((x, i) => {
            if (i > 2) {
              return card(x, i);
            }
            else
              return null;
          })}
        </Row>
      </div>
      <Footer />
    </Container>
  );
}

export default MainPage;
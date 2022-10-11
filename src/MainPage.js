import './App.css';
import React, { useEffect, useState } from 'react';
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

  const [age, setAge] = useState(" ");
  const ImagesHomeScreen = [projetcs, education, career, certifications, skills, achievement];

  const getToday = () => {
    var today = new Date();
    const birthDate = new Date('2000-06-17T21:30:00');
    const yearsDiff = parseInt(today.getFullYear() - birthDate.getFullYear());
    const years = (today.getMonth()>birthDate.getMonth() || (today.getMonth()==birthDate.getMonth() && today.getDate()>birthDate.getDate()))
      ? yearsDiff : yearsDiff - 1;
    const days = parseInt((today - birthDate) / (1000 * 60 * 60 * 24));
    const hours = parseInt(Math.abs(today - birthDate) / (1000 * 60 * 60) % 24);
    const minutes = parseInt(Math.abs(today.getTime() - birthDate.getTime()) / (1000 * 60) % 60);
    const seconds = parseInt(Math.abs(today.getTime() - birthDate.getTime()) / (1000) % 60);
    setAge(years+" years ("+days+" days, "+hours+" hours, "+minutes+" mins, "+seconds+" seconds) old");
  }

  setInterval(getToday,1000);

  useEffect(() => {
    getToday();
    return () => {
      //component will unmount
    }
  },[]);

  function card(x, i) {
    return (
      <Col xs={12} md={{ span: 4, offset: 0 }} key={i}>
        <HomescreenCard ImageSrc={ImagesHomeScreen[i]} CardTitle={x['title']} CardText={x['text']} Cardbutton={x['buttonText']} linkTo={x['link']} />
      </Col>);
  }

  return (
    <Container style={{ color: "#ffffff" }}>
      <div>
        <Row style={{ alignItems: "center" }}>
          <Col xs={12} md={9}>
            <p id='nameHeader'>{staticData["name"]}</p>
            <p>{age}</p>
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
import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Typography from '@mui/material/Typography';
import { Container, Row } from 'react-bootstrap';
import staticData from '../stringConst';
import '../App.css';
import EducationStats from './educationData';
import las from '../media/lasLogo.png';
import fiitjee from '../media/fiitjeeVizag.png';
import kiit from '../media/KiitLogo.png';

export default function EducationPage(props) {

  const images = [las, fiitjee, kiit];

  return (
    <Container>
      <Row>
        <p id='pageHeader'>{staticData["EducationPageHeading"]}</p>
      </Row>
      <Timeline position="alternate" style={{margin: '0'}}>
        {
          EducationStats.map((val, ind) => {
            return (
              <TimelineItem key={ind}>
                <TimelineOppositeContent sx={{ margin: 'auto' }}>
                  <Typography component="span">{val['place']} {val['time']}</Typography>
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineConnector />
                  <TimelineDot>
                    {/* <SchoolSharpIcon color='primary' sx={{ fontSize: '8rem' }} /> */}
                    <img src={images[ind]} alt='institution icon' style={{height:'10rem', width:'10rem', borderRadius: '10rem'}}/>
                  </TimelineDot>
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent sx={{ margin: 'auto', fontSize: '2rem' }} color="#fff"><br/><br/>
                  <Typography variant='h4' component="span">{val['institution']}</Typography><br />
                  <Typography variant="h5" component="span">{val['qualification']}</Typography><br />
                  <Typography variant="h6" component="span">{val['remarks']}</Typography><br />
                </TimelineContent>
              </TimelineItem>
            )
          })
        }
      </Timeline>
    </Container>
  );
}

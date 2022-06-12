import React from 'react';
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
import CareerStats from './CareerData';
import dellLogo from '../media/dell.png';
import hrcLogo from '../media/hrc.png';
import kpmgLogo from '../media/kpmg.png';
import WorkModal from './careerModal';


function CareerPage(props) {

    const images = [dellLogo, dellLogo, hrcLogo, kpmgLogo];
    

    return (
        <Container>
            <Row>
                <p id='pageHeader'>{staticData["CareerPageHeading"]}</p>
            </Row>
            <Timeline position="alternate" style={{ margin: '0' }}>
                {
                    CareerStats.map((val, ind) => {
                        return (
                            <TimelineItem key={ind}>
                                <TimelineOppositeContent sx={{ margin: 'auto' }}>
                                    <Typography component="span">
                                        {val['location']}<br />
                                        {val['time']} <br /><br />
                                        <WorkModal key={ind} heading={val['corp']} body={val['workDone']} corp={val['corp']}/>
                                    </Typography>
                                </TimelineOppositeContent>
                                <TimelineSeparator>
                                    <TimelineConnector />
                                    <TimelineDot>
                                        <img src={images[ind]} alt='institution icon' style={{ height: '8vw', width: '8vw', borderRadius: '8vw' }} />
                                    </TimelineDot>
                                    <TimelineConnector />
                                </TimelineSeparator>
                                <TimelineContent sx={{ margin: 'auto', fontSize: '2rem' }} color="#fff"><br /><br />
                                    <Typography variant='h4' component="span">{val['corp']}</Typography><br />
                                    <Typography variant="h5" component="span">{val['postiion']}</Typography><br /><br />
                                </TimelineContent>
                            </TimelineItem>
                        )
                    })
                }
            </Timeline>
        </Container>
    );
}

export default CareerPage;
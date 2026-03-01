import React from 'react';
import { Container } from 'react-bootstrap';
import '../App.css';
import CareerStats from './CareerData';
import dellLogo from '../media/dell.png';
import hrcLogo from '../media/hrc.png';
import kpmgLogo from '../media/kpmg.png';
import WorkModal from './careerModal';
import PageHeader from './PageHeader';
import clouderaLogo from '../media/cloudera.png';
import microsoftLogo from '../media/microsoft.png';

function CareerPage(props) {
    const images = [microsoftLogo, clouderaLogo, clouderaLogo, dellLogo, dellLogo, hrcLogo, kpmgLogo];

    return (
        <Container>
            <PageHeader header="CareerPageHeading" />
            <div className="timeline-cards">
                {CareerStats.map((val, ind) => (
                    <React.Fragment key={ind}>
                        <div className="timeline-card">
                            <div className="timeline-card-header">
                                <img src={images[ind]} alt={val.corp} className="timelineIcon" />
                                <div className="timeline-card-title">
                                    <h4 className="tc-name">{val.corp}</h4>
                                    <h6 className="tc-role">{val.position}</h6>
                                </div>
                            </div>
                            <div className="timeline-card-meta">
                                <span className="tc-meta-item">{val.time}</span>
                                <span className="tc-meta-sep">•</span>
                                <span className="tc-meta-item">{val.location}</span>
                            </div>
                            <div className="timeline-card-action">
                                <WorkModal heading={val.corp} body={val.workDone} corp={val.corp} />
                            </div>
                        </div>
                        {ind < CareerStats.length - 1 && <hr className="timeline-divider" />}
                    </React.Fragment>
                ))}
            </div>
        </Container>
    );
}

export default CareerPage;

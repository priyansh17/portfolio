import React from 'react';
import { Container } from 'react-bootstrap';
import '../App.css';
import EducationStats from './educationData';
import las from '../media/lasLogo.png';
import fiitjee from '../media/fiitjeeVizag.png';
import kiit from '../media/KiitLogo.png';
import PageHeader from './PageHeader';

export default function EducationPage(props) {
    const images = [kiit, fiitjee, las];

    return (
        <Container>
            <PageHeader header="EducationPageHeading" />
            <div className="timeline-cards">
                {EducationStats.map((val, ind) => (
                    <React.Fragment key={ind}>
                        <div className="timeline-card">
                            <div className="timeline-card-header">
                                <img src={images[ind]} alt={val.institution} className="timelineIcon" />
                                <div className="timeline-card-title">
                                    <h4 className="tc-name">{val.institution}</h4>
                                    <h6 className="tc-role">{val.qualification}</h6>
                                </div>
                            </div>
                            <div className="timeline-card-meta">
                                <span className="tc-meta-item">{val.time}</span>
                                <span className="tc-meta-sep">•</span>
                                <span className="tc-meta-item">{val.place}</span>
                                <span className="tc-meta-sep">•</span>
                                <span className="tc-meta-item tc-remarks">{val.remarks}</span>
                            </div>
                        </div>
                        {ind < EducationStats.length - 1 && <hr className="timeline-divider" />}
                    </React.Fragment>
                ))}
            </div>
        </Container>
    );
}


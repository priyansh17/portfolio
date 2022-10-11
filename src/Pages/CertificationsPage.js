import React from 'react';
import { Container, Row } from 'react-bootstrap';
import Slider from "react-slick";
import certificates from './CertificatesData';
import kpmgCertificate from '../media/certificates/KPMG Certificate.pdf';
import dell1cert from '../media/certificates/Priyansh Choudhary _Dell Internship.pdf';
import dell2cert from '../media/certificates/Dell Summer Internship Completion Certificate.pdf';
import hrcCert from '../media/certificates/1805589_Priyansh Choudhary_Certificate_HighRadius.pdf';
import javaC from '../media/certificates/Core Java Training - Certificate of Completion.pdf';
import androidC from '../media/certificates/Android App Development Training - Certificate of Completion.pdf';
import cProgrammingC from '../media/certificates/Programming with C and C++ Training - Certificate of Completion.pdf';
import webdevC from '../media/certificates/Web Development Training - Certificate of Completion.pdf';
import agileC from '../media/certificates/Dell mandatory trainings/CertificateOfCompletion_Agile Foundations.pdf';
import commC from '../media/certificates/Dell mandatory trainings/CertificateOfCompletion_Communication Foundations.pdf';
import timeManagementC from '../media/certificates/Dell mandatory trainings/CertificateOfCompletion_Time Management Working from Home.pdf';
import androidProj from '../media/certificates/Android App Development Training - Certificate of Excellence.pdf';
import b2bProj from '../media/certificates/1805589_Priyansh Choudhary_HighRadius_Scores.pdf';
import picProj from '../media/certificates/PIC EVALUATION.png'
import CertificateSliderModel from './certificateSliderModel';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';
import PageHeader from './PageHeader';


function CertificationsPage(props) {

    var settings = {
        dots: true,
        className: "center",
        infinite: true,
        swipeToSlide: true,
        initialSlide: 0
    };

    const internshipCerts = [dell1cert, dell2cert, hrcCert, kpmgCertificate];
    const trainingCerts = [javaC, androidC, cProgrammingC, webdevC, agileC, commC, timeManagementC];
    const projectCerts = [b2bProj, picProj, androidProj];

    return (
        <Container>
            <PageHeader header="CertificatesPageHeading" icon={faFilePdf} hasIcon={true}/>
            <Row style={{ paddingTop: "5vh", paddingBottom: "3vh" }}>
                <p id='CertificateHeader'>Trainings</p>
                <Slider slidesToShow={3} {...settings}>
                    {
                        certificates["trainings"].map((val, ind) => {
                            console.log("model added");
                            return (
                                <CertificateSliderModel name={val['name']} pdf={trainingCerts[ind]} />
                            );
                        })}
                </Slider>
            </Row>
            <Row style={{ paddingTop: "5vh", paddingBottom: "3vh" }}>
                <p id='CertificateHeader'>Internships</p>
                <Slider slidesToShow={3} {...settings}>
                    {
                        certificates["internships"].map((val, ind) => {
                            console.log("model added");
                            return (
                                <CertificateSliderModel name={val['name']} pdf={internshipCerts[ind]} />
                            );
                        })}
                </Slider>
            </Row>
            <Row style={{ paddingTop: "5vh", paddingBottom: "3vh" }}>
                <p id='CertificateHeader'>Projects / Competitions</p>
                <Slider slidesToShow={3} {...settings}>
                    {
                        certificates["projects"].map((val, ind) => {
                            console.log("model added");
                            return (
                                <CertificateSliderModel name={val['name']} pdf={projectCerts[ind]} />
                            );
                        })}
                </Slider>
            </Row>
        </Container>
    );
}

export default CertificationsPage;
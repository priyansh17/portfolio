import React from 'react';
import { Container, Row } from 'react-bootstrap';
import staticData from '../stringConst';
import Slider from "react-slick";
import certificates from './CertificatesData';
import certificateSliderModel from './certificateSliderModel';
import kpmgCertificate from '../media/certificates/KPMG Certificate.pdf';

function CertificationsPage(props) {

    var settings = {
        dots: true,
        slidesToShow: 2,
        className: "center",
        infinite: true,
        swipeToSlide: true,
        initialSlide: 0
    };


    return (
        <Container>
            <Row style={{ alignItems: "center" }}>
                <p id='pageHeader'>{staticData["CertificatesPageHeading"]}</p>
            </Row>
            <Row style={{ alignItems: "center", justifyContent: 'left' }}>
                <p id='CertificateHeader'>Trainings</p>
                <Slider {...settings}>
                </Slider>
            </Row>
            <Row style={{ alignItems: "center", justifyContent: 'left' }}>
                <p id='CertificateHeader'>Internships</p>
                <Slider {...settings}>
                {certificates[1].map((val,ind)=>{
                        return (
                            <certificateSliderModel name={val['name']} pdf={kpmgCertificate}/>
                        );
                    })}
                    
                </Slider>
            </Row>
            <Row style={{ alignItems: "center", justifyContent: 'left' }}>
                <p id='CertificateHeader'>Projects / Competitions</p>
                <Slider {...settings}>
                </Slider>
            </Row>
        </Container>
    );
}

export default CertificationsPage;
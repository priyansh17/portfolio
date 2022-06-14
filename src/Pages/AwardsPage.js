import React from 'react';
import staticData from '../stringConst';
import { Container, Row, Accordion } from 'react-bootstrap';
import AwardsData from './AwardsData';

function AwardsPage(props) {

    const keys = AwardsData.map((e,i)=>i);

    return (
        <Container>
            <Row>
                <p id='pageHeader'>{staticData["AwardsPageHeading"]}</p>
            </Row>
            <Row>
                <Accordion defaultActiveKey={keys} alwaysOpen style={{ color: '#000' }}>
                    {
                        AwardsData.map((val, k) => {
                            return (
                                <Accordion.Item key={k} eventKey={k}>
                                    <Accordion.Header>{val['award']}</Accordion.Header>
                                    <Accordion.Body style={{ display: 'flex', justifyContent: 'space-between'}}>
                                        <div>{val['desc']}</div>
                                        <div>{val['time']}</div>
                                    </Accordion.Body>
                                </Accordion.Item>
                            );
                        })
                    }

                </Accordion>
            </Row>

        </Container>
    );
}

export default AwardsPage;
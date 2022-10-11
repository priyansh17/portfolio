import React from 'react';
import { Container,Row, Accordion } from 'react-bootstrap';
import AwardsData from './AwardsData';
import PageHeader from './PageHeader';

function AwardsPage(props) {

    const keys = AwardsData.map((e,i)=>i);

    return (
        <Container>
        <PageHeader header="AwardsPageHeading"/>
           
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
import React from 'react';
import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';

function HomescreenCard(props) {
    return (
        <div>
            <Card className='homescreenCards bg-dark'>
                <Card.Img variant="top" className='homescreenImages' src={props.ImageSrc} />
                <Card.Body>
                    {/* <Card.Title style={{ fontSize: '2.5vh' }}>{props.CardTitle}</Card.Title> */}
                    <Card.Text style={{ fontSize: '1.5vh' }}>
                        {props.CardText}
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                    <Link to={props.linkTo}>
                        <Button variant="primary" style={{ fontSize: '1.5vh' }}>{props.Cardbutton}</Button>
                    </Link>
                </Card.Footer>
            </Card>
        </div>
    );
}

export default HomescreenCard;
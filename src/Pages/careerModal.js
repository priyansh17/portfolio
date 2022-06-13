import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import parse from 'html-react-parser';

function CareerModal(props) {

    const [showModal, setShowModal] = React.useState(false);
    const toggleModal = () => {
        setShowModal(!showModal);
    };

    return (
        <div>
        <Button onClick={toggleModal} variant="primary" style={{ fontSize: '1.5vh' }}>My Work at {props.corp}</Button>
        <Modal style={{color: '#000'}} show={showModal} onHide={toggleModal} size="md" centered>
            <Modal.Header closeButton>
                <Modal.Title>
                    {props.heading}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {parse(props.body)}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={toggleModal}>Close</Button>
            </Modal.Footer>
            {console.log("Modal created")}
        </Modal>
        </div>
    );
}

export default CareerModal;
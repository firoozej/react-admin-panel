import React from 'react';
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from 'reactstrap';

export default (props) => (
    <Modal isOpen={props.isOpen}>
        <ModalHeader>Error Occurred</ModalHeader>
        <ModalBody>
            {props.message}
        </ModalBody>
        <ModalFooter>
            <Button color='primary' onClick={props.onCloseClicked}>Close</Button>
        </ModalFooter>
    </Modal>
);
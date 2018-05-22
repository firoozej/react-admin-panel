import React from 'react';
import {Card, Col, Row} from "reactstrap";

export default function withBox(Component) {
    return (props) => {
        return (
            <div className='animated fadeIn'>
                <Row>
                    <Col lg='12'>
                        <Card>
                            <Component {...props}/>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    };
}
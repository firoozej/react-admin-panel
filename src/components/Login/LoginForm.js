import React from 'react';
import {withFormik, Form, Field} from 'formik';
import {
    Button, Col, Card, CardBody, Row, Container, CardGroup, InputGroup, InputGroupAddon,
    InputGroupText
} from 'reactstrap';
import CustomInput from '../CustomInput';
import Loading from '../Loading';

const Yup = require('yup');

const LoginForm = ({loginError, loading}) => (
    <div className='app flex-row align-items-center'>
        <Container>
            <Row className='justify-content-center'>
                <Col md='6'>
                    <CardGroup>
                        <Card className='p-4'>
                            <CardBody>
                                <Form>
                                    <h1>Login {loading ? <Loading button/> : ''}</h1>
                                    <p className='text-muted'>Sign In to your account</p>
                                    <InputGroup className='mb-3'>
                                        <InputGroupAddon addonType='prepend'>
                                            <InputGroupText>
                                                <i className='icon-user'></i>
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Field type='email' name='email' placeholder='Email' component={CustomInput}/>
                                    </InputGroup>
                                    <InputGroup className='mb-4'>
                                        <InputGroupAddon addonType='prepend'>
                                            <InputGroupText>
                                                <i className='icon-lock'></i>
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Field type='password' name='password' placeholder='Password'
                                               component={CustomInput}/>
                                    </InputGroup>
                                    <Row>
                                        <Col xs='6'>
                                            <Button color='primary'
                                                    className='px-4'>Login</Button>
                                        </Col>
                                        <Col xs='6' className='text-right'>
                                            <Button color='link' className='px-0'>Forgot password?</Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </CardBody>
                        </Card>
                    </CardGroup>
                </Col>
            </Row>
        </Container>
    </div>
)

export default withFormik({
    mapPropsToValues({email='', password=''}) {
        return {
            email,
            password
        }
    },
    validationSchema: Yup.object().shape({
        email: Yup.string().email('Email Is Not Valid').required('Email is required'),
        password: Yup.string().required('Password is required')
    }),
    handleSubmit(values, {props}) {
        props.onSubmit(values);
    }
})(LoginForm);
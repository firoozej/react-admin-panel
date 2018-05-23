import React, { Component } from 'react';
import { Button, Col, FormGroup, Label, CardBody, CardHeader, CardFooter } from 'reactstrap';
import { withFormik, Form, Field } from 'formik';
import Loading from '../Loading';
import CustomInput from '../CustomInput';
import CustomSelect from '../CustomSelect';
import withBox from '../withBox';
const Yup = require('yup');

class CForm extends Component {
    componentDidMount() {
        this.props.setFieldValue(
            "roles",
            this.props.values.roles.map(role => role.id)
        )
    }
    onRoleChange = (evt) => {
        this.props.setFieldValue(
            "roles",
            [].slice
                .call(evt.target.selectedOptions)
                .map(option => option.value)
        )
    }
    render() {
        return (
            <React.Fragment>
                <CardHeader>
                    {this.props.mode === 'create' ? 'New User' : 'Edit User'}
                </CardHeader>
                <Form>
                    <CardBody>
                        <FormGroup row>
                            <Col md='1'>
                                <Label>Email</Label>
                            </Col>
                            <Col xs='12' md='5'>
                                <Field name='email' placeholder='Email' component={CustomInput} />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col md='1'>
                                <Label>Password</Label>
                            </Col>
                            <Col xs='12' md='5'>
                                <Field type='password' name='password' placeholder='Password' component={CustomInput} />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col md='1'>
                                <Label>Name</Label>
                            </Col>
                            <Col xs='12' md='5'>
                                <Field name='name' placeholder='Name' component={CustomInput} />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col md='1'>
                                <Label>Assign To Role</Label>
                            </Col>
                            <Col xs='12' md='5'>
                                <Field name="roles" component={CustomSelect}
                                    onChange={this.onRoleChange} />

                            </Col>
                        </FormGroup>
                    </CardBody>
                    <CardFooter>
                        <Button color='primary'>Submit {this.props.loading ? <Loading button /> : ''}</Button>
                    </CardFooter>
                </Form>
            </React.Fragment>

        )

    }
}

export default withFormik({
    mapPropsToValues({ id = '', name = '', email = '', password = '', roles = [] }) {
        return {
            id,
            name,
            email,
            password,
            roles
        }
    },
    validationSchema: (props) => {
        return Yup.object().shape({
            email: Yup.string().email('Email is not valid').required('Email is required'),
            password: props.mode === 'create'
                ? Yup.string().min('3', 'Password must be at least 3 characters').required('Password is required') :
                Yup.string(),
            name: Yup.string().required('Name is required'),
            roles: Yup.array().required('Select a role')
        });
    },
    handleSubmit(values, { props }) {
        props.onSubmit(values);
    }
})(withBox(CForm));
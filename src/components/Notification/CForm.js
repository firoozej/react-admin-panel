import React, { Component } from 'react';
import { Button, Col, FormGroup, Label, CardBody, CardHeader, CardFooter } from 'reactstrap';
import { withFormik, Form, Field } from 'formik';
import Loading from '../Loading';
import CustomInput from '../Input/CustomInput';
import CustomSelect from '../Input/CustomSelect';
import withBox from '../withBox';
import { getUsersQuery as USERS_QUERY } from '../../queries';
const Yup = require('yup');

class CForm extends Component {
    componentDidMount() {
        this.props.setFieldValue(
            "users",
            this.props.values.users.map(user => user.id)
        )
    }
    onUserChange = (evt) => {
        this.props.setFieldValue(
            "users",
            [].slice
                .call(evt.target.selectedOptions)
                .map(option => option.value)
        )
    }
    render() {
        return (
            <React.Fragment>
                <CardHeader>
                    {this.props.mode === 'create' ? 'New Notification' : 'Edit Notification'}
                </CardHeader>
                <Form>
                    <CardBody>
                        <FormGroup row>
                            <Col md='1'>
                                <Label>Name</Label>
                            </Col>
                            <Col xs='12' md='5'>
                                <Field name='text' placeholder='Text' component={CustomInput} />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col md='1'>
                                <Label>Send To User</Label>
                            </Col>
                            <Col xs='12' md='5'>
                                <Field name="users" component={CustomSelect}
                                    onChange={this.onUserChange}
                                    LIST_QUERY={USERS_QUERY}
                                    multiple
                                />

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
    mapPropsToValues({ id = '', text = '', users = [] }) {
        return {
            id,
            text,
            users
        }
    },
    validationSchema: Yup.object().shape({
        text: Yup.string().required('Text is required')
    }),
    handleSubmit(values, { props }) {
        props.onSubmit(values);
    }
})(withBox(CForm));
import React from 'react';
import {Button, Col, FormGroup, Label, CardBody, CardHeader, CardFooter} from 'reactstrap';
import {withFormik, Form, Field} from 'formik';
import Loading from '../Loading';
import CustomInput from '../CustomInput';
import withBox from '../withBox';
const Yup = require('yup');

const CForm = ({mode, loading}) => (
    <React.Fragment>
        <CardHeader>
            {mode === 'create' ? 'New Role' : 'Edit Role'}
        </CardHeader>
        <Form>
            <CardBody>
                <FormGroup row>
                    <Col md='1'>
                        <Label>Name</Label>
                    </Col>
                    <Col xs='12' md='5'>
                        <Field type='name' name='name' placeholder='Name' component={CustomInput}/>
                    </Col>
                </FormGroup>
            </CardBody>
            <CardFooter>
                <Button color='primary'>Submit {loading ? <Loading button/> : ''}</Button>
            </CardFooter>
        </Form>
    </React.Fragment>

);

export default withFormik({
    mapPropsToValues({id = '', name = ''}) {
        return {
            id,
            name
        }
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().required('Name is required')
    }),
    handleSubmit(values, {props}) {
        props.onSubmit(values);
    }
})(withBox(CForm));
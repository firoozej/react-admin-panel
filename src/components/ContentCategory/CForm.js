import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Button, Col, FormGroup, Label, CardBody, CardHeader, CardFooter } from 'reactstrap';
import { withFormik, Form, Field } from 'formik';
import Loading from '../Loading';
import CustomInput from '../CustomInput';
import CustomSelect from '../CustomSelect';
import withBox from '../withBox';
const Yup = require('yup');

const LIST_QUERY = gql`
{
    categoriesForSelect {
        id
        name
    }
}
`;

class CForm extends Component {
    componentDidMount() {
        this.props.setFieldValue(
            'parent',
            this.props.values.parent
        )
    }
    onCategoryChange = (evt) => {
        this.props.setFieldValue(
            'parent',
            evt.target.selectedOptions[0].value
        )
    }
    render() {
        return (
            <React.Fragment>
                <CardHeader>
                    {this.props.mode === 'create' ? 'New Category' : 'Edit Category'}
                </CardHeader>
                <Form>
                    <CardBody>
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
                                <Label>Assign To Category</Label>
                            </Col>
                            <Col xs='12' md='5'>
                                <Field
                                    name='parent'
                                    component={CustomSelect}
                                    onChange={this.onCategoryChange}
                                    LIST_QUERY={LIST_QUERY}
                                    showSelectOne
                                    fetchPolicy='network-only' />

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
    mapPropsToValues({ id = '', name = '', parent = '' }) {
        return {
            id,
            name,
            parent
        }
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().required('Name is required')
    }),
    handleSubmit(values, { props }) {
        props.onSubmit(values);
    }
})(withBox(CForm));
import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Button, Col, FormGroup, Label, CardBody, CardHeader, CardFooter } from 'reactstrap';
import { withFormik, Form, Field, FieldArray } from 'formik';
import Loading from '../Loading';
import CustomInput from '../Input/CustomInput';
import CustomSelect from '../Input/CustomSelect';
import withBox from '../withBox';
import FileManager from '../FileManager/index';
const Yup = require('yup');

const LIST_CATEGORY_QUERY = gql`
{
    categoriesForSelect {
        id
        name
    }
}
`;

class CForm extends Component {
    state = {
        fileManager: false
    }
   
    onCategoryChange = (evt) => {
        this.props.setFieldValue(
            'category',
            evt.target.selectedOptions[0].value
        );
    }
    onSelectFilesClick = (selectedFiles) => {

        this.props.setFieldValue(
            'files',
            selectedFiles
        );
    }
    onAddFileClick = () => {
        this.setState({
            fileManager: true
        });
    }
    onCloseClick = () => {
        this.setState({
            fileManager: false
        });
    }
    render() {
        const values = this.props.values;
        return (
            <React.Fragment>
                <CardHeader>
                    {this.props.mode === 'create' ? 'New Item' : 'Edit Item'}
                </CardHeader>
                <Form>
                    <CardBody>
                        <FormGroup row>
                            <Col md='2'>
                                <Label>Name</Label>
                            </Col>
                            <Col xs='12' md='5'>
                                <Field name='name' placeholder='Name' component={CustomInput} />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col md='2'>
                                <Label>Assign To Category</Label>
                            </Col>
                            <Col xs='12' md='5'>
                                <Field
                                    name='category'
                                    component={CustomSelect}
                                    onChange={this.onCategoryChange}
                                    LIST_QUERY={LIST_CATEGORY_QUERY}
                                    showSelectOne />

                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col md='2'>
                                <Label>Description</Label>
                            </Col>
                            <Col xs='12' md='5'>
                                <Field name='description' placeholder='Description' component={CustomInput} />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col md='2'>
                                <Label>Files</Label>
                            </Col>
                            <Col xs='12' md='5'>
                                <Button
                                    color='secondary'
                                    onClick={this.onAddFileClick}>
                                    Add File
                                </Button>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col md='2'>
                            </Col>
                            <Col xs='12' md='5'>
                                <FieldArray name='files' render={arrayHelpers => (
                                        values.files.length > 0 && (
                                            values.files.map((file, index) => (
                                                <div key={file} className='my-2'>
                                                    <Button className='mr-2' onClick={() => arrayHelpers.remove(index)}>
                                                        -
                                                    </Button>
                                                    {file.slice(file.lastIndexOf('/') + 1)}
                                                </div>
                                            ))
                                        )
                                )} />
                            </Col>
                        </FormGroup>
                    </CardBody>
                    <CardFooter>
                        <Button color='primary'>Submit {this.props.loading ? <Loading button /> : ''}</Button>
                    </CardFooter>
                </Form>
                <FileManager
                    isOpen={this.state.fileManager}
                    onSelectFilesClick={this.onSelectFilesClick}
                    onCloseClick={this.onCloseClick}
                />
            </React.Fragment>

        )

    }
}

export default withFormik({
    mapPropsToValues({ id = '', name = '', category = '', description = '', files = [] }) {
        return {
            id,
            name,
            category: category.id,
            description,
            files: files.map(file => file.path)
        }
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().required('Name is required'),
        category: Yup.string().required('Category is required'),
    }),
    handleSubmit(values, { props }) {
        props.onSubmit(values);
    }
})(withBox(CForm));
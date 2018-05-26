import React, {Component} from 'react';
import { Button, Col, FormGroup, Label, CardBody, CardHeader, CardFooter } from 'reactstrap';
import { withFormik, Form, Field } from 'formik';
import Loading from '../Loading';
import CustomInput from '../CustomInput';
import CustomSelect from '../CustomSelect';
import withBox from '../withBox';
import { rolesQuery } from '../../queries';
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
                    {this.props.mode === 'create' ? 'New Permission' : 'Edit Permission'}
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
                                <Label>Assign To Role</Label>
                            </Col>
                            <Col xs='12' md='5'>
                                <Field name="roles" component={CustomSelect} 
                                       onChange={this.onRoleChange}
                                       LIST_QUERY={rolesQuery}
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
    mapPropsToValues({ id = '', name = '', roles = [] }) {
        return {
            id,
            name,
            roles
        }
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().required('Name is required')
    }),
    handleSubmit(values, { props }) {
        props.onSubmit(values);
    }
})(withBox(CForm));
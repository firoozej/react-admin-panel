import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from 'reactstrap';
import { withFormik, Form, Field } from 'formik';
import CustomInput from '../Input/CustomInput';
import withError from '../withError';
import { files as FILES_QUERY } from '../../queries';
const Yup = require('yup');

const NEW_FOLDER_MUTATION = gql`
mutation newFolder($folderName: String!,$path: String) {
  newFolder(folderName: $folderName, path: $path) {
   name
   type
   path
  }
}
`;

let NewFolderForm = (props) => (
    <Modal isOpen={props.isOpen}>
        <Form>
            <ModalHeader>New Folder</ModalHeader>
            <ModalBody>
                <Field name='folderName' placeholder='New Folder Name' component={CustomInput} />
            </ModalBody>
            <ModalFooter>
                <Button color='primary' type='submit'>Ok</Button>
                <Button color='primary' onClick={props.onCloseClick}>Close</Button>
            </ModalFooter>
        </Form>
    </Modal>

);

NewFolderForm = withFormik({
    mapPropsToValues({ folderName = '' }) {
        return {
            folderName
        }
    },
    validationSchema: Yup.object().shape({
        folderName: Yup.string().required('Folder Name is required')
    }),
    handleSubmit(values, { props }) {
        props.onSubmit(values);
    }
})(NewFolderForm);


class NewFolderModal extends Component {
    onUpdate = (cache, { data: { newFolder: item } }) => {
        const { files } = cache.readQuery({
            query: FILES_QUERY,
            variables: {
                path: this.props.path,
            }
        });
        cache.writeQuery({
            query: FILES_QUERY,
            variables: {
                path: this.props.path,
            },
            data: { files: files.concat([item]) }
        });
    };
    onSubmit = (newFolderMutation, vars) => {
        this.props.onSubmit(newFolderMutation, vars);
    }
    render() {
        return (
            <Mutation mutation={NEW_FOLDER_MUTATION}
                update={this.onUpdate}
                onError={this.props.onError}
            >
                {(newFolderMutation, { loading }) => (
                    <NewFolderForm isOpen={this.props.isOpen}
                        onCloseClick={this.props.onCloseClick}
                        onSubmit={this.onSubmit.bind(this, newFolderMutation)} />

                )}
            </Mutation>
        );
    }
}
export default withError(NewFolderModal);
import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Dropzone from 'react-dropzone';
import withError from '../withError';
import Loading from '../Loading';
import {files as FILES_QUERY} from '../../queries';

const dropzoneStyle = {
    borderWidth: 1,
    borderColor: 'rgb(102, 102, 102)',
    borderStyle: 'dashed',
    margin: '1.5em',
    padding: '1em',
}

const UPLOAD_FILE = gql`
mutation uploadFile($file: String!, $path: String, $name: String!) {
  uploadFile(file:$file, path: $path, name: $name) {
    name
    type
    path
  }
}
`;


class DropZone extends Component {
    onDropFile = (uploadFileMutation, acceptedFiles) => {

        acceptedFiles.forEach(file => {
            const reader = new FileReader();
            reader.onload = () => {
                const fileAsBinaryString = reader.result;
                uploadFileMutation({
                    variables: {
                        name: file.name,
                        file: fileAsBinaryString,
                        path: this.props.path
                    }
                });
            };
            reader.onabort = () => console.log('file reading was aborted');
            reader.onerror = () => console.log('file reading has failed');

            reader.readAsDataURL(file);
        });
    };
    onUpdate = (cache, { data: { uploadFile: item } }) => {
            const { files } = cache.readQuery({ 
                query: FILES_QUERY, 
                variables: {
                    path: this.props.path,
                } 
            });
            if(!files.some(existingItem => existingItem.path === item.path)) {
                cache.writeQuery({
                    query: FILES_QUERY,
                    variables: {
                        path: this.props.path,
                    },
                    data: { files: files.concat([item]) }
                });
            }
    };
    render() {
        return (
            <Mutation
                mutation={UPLOAD_FILE}
                onError={this.props.onError}
                update={this.onUpdate}>
                {(uploadFileMutation, { loading }) => (
                    <React.Fragment>
                        <Dropzone
                            style={dropzoneStyle}
                            //maxSize={5000000}
                            onDrop={this.onDropFile.bind(this, uploadFileMutation)}>
                            <p>
                                <i className='fa fa-plus d-inline-block align-middle mr-1'></i>
                                Click To Select And Upload Files
                        </p>
                        </Dropzone>
                        {loading ? <div className='mx-4'><Loading indeterminateProgress /></div> : ''}
                    </React.Fragment>
                )}
            </Mutation>
        );
    }
}
export default withError(DropZone);

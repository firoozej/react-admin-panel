import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { files as FILES_QUERY } from '../../queries';
import withError from '../withError';

const DELETE_FILE_MUTATION = gql`
mutation deleteFile($files: [String], $folders: [String]) {
  deleteFile(files: $files, folders: $folders) {
   name
   type
   path
  }
}
`;
const DeleteFile = (props) => (
    <Mutation mutation={DELETE_FILE_MUTATION}
        refetchQueries={() => [{
            query: FILES_QUERY,
            variables: {
                path: props.path
            }
        }]}
        onError={props.onError}
    >
        {(deleteFileMutation, { loading }) => {
            return (

                <div className='d-inline-block mr-2'
                    onClick={() => props.onDeleteFile(deleteFileMutation)}
                >
                    <i className='fa fa-remove d-inline-block align-middle mr-1 text-primary'>
                    </i>
                    <span>Delete</span>
                </div>
            );
        }}

    </Mutation>
);
export default withError(DeleteFile);

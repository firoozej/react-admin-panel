import React from 'react';
export default (props) => (
    <div className='d-inline-block mr-2' onClick={props.onNewFolderClick}>
        <i className='fa fa-folder d-inline-block align-middle mr-1 text-primary'>
        </i>
        <span>New Folder</span>
    </div>
)
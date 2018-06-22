import React, { Component } from 'react';
import NewFolderForm from './NewFolderForm';
import NewFolder from './NewFolder';
import DeleteFile from './DeleteFile';


class Opertion extends Component {
    state = {
        newFolderModalOpen: false
    }
    onCloseClick = () => {
        this.setState({
            newFolderModalOpen: false
        });
    };
    onNewFolderClick = () => {
        this.setState({
            newFolderModalOpen: true
        });
    }
    onNewFolderSubmit = (newFolderMutation, vars) => {
        newFolderMutation({
            variables: {
                ...vars,
                path: this.props.path

            }
        });
        this.setState({
            newFolderModalOpen: false
        });
    }
    
    render() {
        return (
            <React.Fragment>
                <div className='py-1 px-3 border-bottom border-light operation-list'>
                    <NewFolder onNewFolderClick={this.onNewFolderClick} />
                    <DeleteFile path={this.props.path} onDeleteFile={this.props.onDeleteFile}/>
                </div>
                <NewFolderForm isOpen={this.state.newFolderModalOpen}
                                onCloseClick={this.onCloseClick}
                                onSubmit={this.onNewFolderSubmit}
                                path={this.props.path}/>

            </React.Fragment>
        );
    }
}
export default Opertion;

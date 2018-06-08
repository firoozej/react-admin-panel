import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { Modal, ModalBody, ModalFooter, ModalHeader, Button, Col, Row } from 'reactstrap';
import Dropzone from './Dropzone';
import Loading from '../Loading';
import Error from '../Error';
import Path from './Path';
import Operation from './Operation';
import { files as FILES_QUERY } from '../../queries';


class FileManager extends Component {
    state = {
        currentPath: '',
        pathList: [],
        selectedFiles: []
    };

    resetState () {
        this.setState({
            currentPath: '',
            pathList: [],
            selectedFiles: []
        });
    }

    onCloseClick = () => {
        this.resetState();
        this.props.onCloseClick();
    };

    onPathChange = (path) => {
        if (path === '') {
            this.setState({
                currentPath: '',
                pathList: []
            });
            return;
        }
        this.setState(prevState => {
            let pathList = prevState.pathList, p;
            while (true) {
                p = pathList.pop();
                if (p === path) {
                    pathList.push(p);
                    break;
                }
            }
            return {
                currentPath: path,
                pathList
            };
        });
    };



    onFolderClick(path) {
        this.setState(prevState => ({
            currentPath: path,
            pathList: [...prevState.pathList, path]
        }));
    }

    onFileClick(path) {
        this.setState(prevState => {
            if (prevState.selectedFiles.includes(path)) {
                const selectedFiles = prevState.selectedFiles.filter(filePath => filePath !== path);
                return {
                    selectedFiles
                }
            }
            else {
                return {
                    selectedFiles: [...prevState.selectedFiles, path]
                }
            }
        });
    }

    onSelectFilesClick = () => {
        this.props.onSelectFilesClick(this.state.selectedFiles);
        this.onCloseClick();
    }

    renderFileView(data) {
        const files = data.files.map(file => {
            if (file.type === 'file') {
                return (
                    <Col key={file.name} md='6'>
                        <div
                            onClick={this.onFileClick.bind(this, file.path)}
                            className={`pointer mb-3 ${this.state.selectedFiles.includes(file.path) ? 'selected-file' : ''}`}>
                            <i className='fa fa-file font-3xl d-block align-middle mr-1 text-primary'></i>
                            <div className='align-middle d-inline-block'>{file.name}</div>
                        </div>
                    </Col>
                );

            }
            else {
                return (
                    <Col key={file.name} md='6'>
                        <div onClick={this.onFolderClick.bind(this, file.path)} className='pointer mb-3'>
                            <i className='fa fa-folder font-4xl d-block align-middle mr-1 text-primary'></i>
                            <div className='align-middle d-inline-block'>{file.name}</div>
                        </div>
                    </Col>

                );
            }
        });
        return <Row>{files}</Row>;
    }
    render() {
        return (
            <Modal isOpen={this.props.isOpen} size='lg' className='file-manager'>
                <ModalHeader>File Manager</ModalHeader>
                <Operation onUploadClick={this.onUploadClick} />

                <Path pathList={this.state.pathList} onPathChange={this.onPathChange} />
                <Dropzone path={this.state.currentPath} />
                <ModalBody>
                    <Query
                        query={FILES_QUERY}
                        variables={{ path: this.state.currentPath }}>
                        {({ loading, error, data }) => {
                            if (loading) return <Loading />;
                            if (error) return <Error error={error} />;
                            return this.renderFileView(data);
                        }}
                    </Query>
                </ModalBody>
                <ModalFooter>
                    <Button color='primary' onClick={this.onSelectFilesClick}>Select Files</Button>
                    <Button color='primary' onClick={this.onCloseClick}>Close</Button>
                </ModalFooter>
            </Modal>
        )
    }
}
export default FileManager;
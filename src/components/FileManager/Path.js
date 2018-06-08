import React from 'react';
export default (props) => {

    const homePath = <span
        onClick={props.onPathChange.bind(null, '')}>
        <i className="icon-arrow-right icons mrl-4 align-middle"></i>
        Home
    </span>;

    const pathList = props.pathList.map(path => {
        return (
            <span key={path}
                onClick={props.onPathChange.bind(null, path)}>
                <i className="icon-arrow-right icons mrl-4 align-middle"></i>
                {path.slice(path.lastIndexOf('/') + 1)}
            </span>
        )
    });
    
    return <div className='py-1 px-3 border-bottom border-light path-list'>{homePath}{pathList}</div>;
}
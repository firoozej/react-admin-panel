import React from 'react';

export default (props) => (
    props.button
        ? <div className='button-loading-indicator'><img  src={'/assets/img/loading.gif'} alt=''/></div>
        : <div className='loading-indicator'><img  src={'/assets/img/loading.gif'} alt=''/></div>

);
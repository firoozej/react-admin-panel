import React from 'react';

export default (props) => {
    if (props.button) {
        return <div className='button-loading-indicator'><img src={'/assets/img/loading.gif'} alt='' /></div>
    }
    if(props.menu) {
        return <div className='menu-loading-indicator'><img src={'/assets/img/loading-white.gif'} alt='' /></div>
    }
        
    else return <div className='loading-indicator'><img src={'/assets/img/loading.gif'} alt='' /></div>

}
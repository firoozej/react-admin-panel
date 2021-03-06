import React from 'react';

export default (props) => {
    if (props.button) {
        return <div className='button-loading-indicator'><img src={'/assets/img/loading.gif'} alt='' /></div>
    }
    if (props.menu) {
        return <div className='menu-loading-indicator'><img src={'/assets/img/loading-white.gif'} alt='' /></div>
    }
    if (props.indeterminateProgress) {
        return (<div className='progress'>
            <div className='indeterminate'></div>
        </div>);
    }

    else return <div className='loading-indicator my-2'><img src={'/assets/img/loading.gif'} alt='' /></div>

}
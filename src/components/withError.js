import React from 'react';
import ErrorContext from '../context/error';

export default function withError(Component) {
    return (props) => {
        return (
            <ErrorContext.Consumer>
                {onError => <Component {...props} onError={onError} />}
            </ErrorContext.Consumer>
        );
    };
}
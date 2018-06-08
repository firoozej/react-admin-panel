import React from 'react';
import {Input} from "reactstrap";

const CustomInput = ({
                         field, // { name, value, onChange, onBlur }
                         form: {touched, errors}, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                         ...props
                     }) => {
    const error = touched[field.name] && errors[field.name];
    return (
        <div>
            <Input type='text' className={error && 'is-invalid'} {...field} {...props} />
            {error && <div className='help-block error'>{errors[field.name]}</div>}
        </div>
    )
};
export default CustomInput;
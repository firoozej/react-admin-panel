import React from 'react';
import { Input } from 'reactstrap';
import { Query } from 'react-apollo';
import Error from './Error';
import { getRolesQuery } from '../queries';

const CustomSelect = ({
    field, // { name, value, onChange, onBlur }
    form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
    ...props
}) => {
    const error = touched[field.name] &&
        errors[field.name];

    return (
        <div>
            <Query query={getRolesQuery}>
                {({ loading, error, data }) => {

                    if (loading) return <Input type="select" className={error && 'is-invalid'} {...field} {...props} multiple></Input>;
                    if (error) return <Error error={error} />;

                    return (
                        <Input type="select" className={error && 'is-invalid'} {...field} {...props} multiple>
                            {data.roles.map(role => <option key={role.id} value={role.id}>{role.name}</option>)}
                        </Input>
                    );
                }}
            </Query>
            {error &&
                <div className='help-block error'>{errors[field.name]}</div>}
        </div>
    )
};
export default CustomSelect;
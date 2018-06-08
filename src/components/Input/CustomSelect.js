import React from 'react';
import { Input } from 'reactstrap';
import { Query } from 'react-apollo';
import Error from '../Error';

const CustomSelect = ({
    field, // { name, value, onChange, onBlur }
    form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
    ...props
}) => {
    const error = touched[field.name] && errors[field.name];

    return (
        <div>
            <Query query={props.LIST_QUERY} fetchPolicy={props.fetchPolicy ? props.fetchPolicy : 'cache'}>
                {({ loading, error, data }) => {

                    if (loading) return <Input type="select" className={error && 'is-invalid'} {...field} multiple={props.multiple}></Input>;
                    if (error) return <Error error={error} />;

                    return (
                        <Input
                            type="select"
                            className={error && 'is-invalid'}
                            {...field}
                            onChange={props.onChange}
                            multiple={props.multiple}>
                            {props.showSelectOne ? <option key={0} value=''>Select</option> : ''}
                            {data[Object.keys(data)[0]].map(item => (
                                <option key={item.id} value={item.id}>{item.name}</option>)
                            )}

                        </Input>
                    );
                }}
            </Query>
            {error && <div className='help-block error'>{errors[field.name]}</div>}
        </div>
    )
};
export default CustomSelect;
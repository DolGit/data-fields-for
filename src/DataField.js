import React from 'react';
import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';

class DataField extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.state = {}
        this.setValue()
        this.setErrors()
        this.state.name = `${this.props.name}[${this.props.method}]`
        this.handleChange = this.handleChange.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.field != this.props.field) {
            this.setValue()
            this.setErrors()
        }
    }

    setValue() {
        const field = this.props.fields[this.props.method]
        this.state.value = field && field.value ? field.value : this.props.value
        this.state.required = field && field.required ? field.required : false
    }

    setErrors() {
        const field = this.props.fields[this.props.method]
        if (field && field.error) {
            this.state.error = field.error
            this.state.helperText = field.errorText
            return
        }

        this.state.helperText = field && field.helperText ? field.helperText : ''
    }

    handleChange(e) {
        this.setState({value: e.target.value})
        this.props.fields[this.props.method].value = e.target.value;
        if (this.props.fields._object) {
            this.props.fields._object[this.props.method] = e.target.value
        }
        if (this.props.handleChange && typeof(this.props.handleChange) === 'function') {
            this.props.handleChange(e)
        }
    }

    render() {
        const props = {...this.props}
        delete props['handleChange']
        return (
            <TextField
                {...this.props.opts}
                {...props}
                fullWidth={this.props.fullWidth || true}

                name={this.state.name}
                value={this.state.value}
                required={this.state.required}
                helperText={this.state.helperText}
                error={this.state.error}
                
                onChange={this.handleChange}
                margin="normal"
                variant="outlined"
            />
        )
    }
}

DataField.propTypes = {
    method: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    fields: PropTypes.object.isRequired,
    opts: PropTypes.object,
};

export default DataField;
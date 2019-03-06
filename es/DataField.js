var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';

var DataField = function (_React$Component) {
    _inherits(DataField, _React$Component);

    function DataField(props, context) {
        _classCallCheck(this, DataField);

        var _this = _possibleConstructorReturn(this, _React$Component.call(this, props, context));

        _this.state = {};
        _this.setValue();
        _this.setErrors();
        _this.state.name = _this.props.name + '[' + _this.props.method + ']';
        _this.handleChange = _this.handleChange.bind(_this);
        return _this;
    }

    DataField.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        if (nextProps.fields != this.props.fields) {
            this.setValue();
            this.setErrors();
        }
    };

    DataField.prototype.setValue = function setValue() {
        var field = this.props.fields[this.props.method];
        this.state.value = field && field.value ? field.value : this.props.value;
        this.state.required = field && field.required ? field.required : false;
    };

    DataField.prototype.setErrors = function setErrors() {
        var field = this.props.fields[this.props.method];
        if (field && field.error) {
            this.state.error = field.error;
            this.state.helperText = field.errorText;
            return;
        }

        this.state.helperText = field && field.helperText ? field.helperText : '';
    };

    DataField.prototype.handleChange = function handleChange(e) {
        this.setState({ value: e.target.value });
        this.props.fields[this.props.method].value = e.target.value;
        if (this.props.fields._object) {
            this.props.fields._object[this.props.method] = e.target.value;
        }
        if (this.props.handleChange && typeof this.props.handleChange === 'function') {
            this.props.handleChange(e);
        }
    };

    DataField.prototype.render = function render() {
        var props = _extends({}, this.props);
        delete props['handleChange'];
        return React.createElement(TextField, _extends({}, this.props.opts, props, {
            fullWidth: this.props.fullWidth || true,

            name: this.state.name,
            value: this.state.value,
            required: this.state.required,
            helperText: this.state.helperText,
            error: this.state.error,

            onChange: this.handleChange,
            margin: 'normal',
            variant: 'outlined'
        }));
    };

    return DataField;
}(React.Component);

DataField.propTypes = process.env.NODE_ENV !== "production" ? {
    method: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    fields: PropTypes.object.isRequired,
    opts: PropTypes.object
} : {};

export default DataField;
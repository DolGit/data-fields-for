'use strict';

exports.__esModule = true;
exports.DataField = undefined;
exports.dataFromElement = dataFromElement;
exports.errorsToFields = errorsToFields;
exports.objectToFields = objectToFields;

var _DataField = require('./DataField.js');

var _DataField2 = _interopRequireDefault(_DataField);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.DataField = _DataField2.default;
function dataFromElement(handle) {
    var el = document.getElementById(handle);
    if (!el) return false;
    var data = el.getAttribute('data');
    if (!data) return false;
    return JSON.parse(data);
}

function errorsToFields(errors, fields) {
    for (var key in errors) {
        var field = fields[key];
        if (field) {
            field.error = true;
            field.errorText = errors[key].join(', ');
        }
    }
}

function objectToFields(object, fields) {
    if (object) {
        for (var field in fields) {
            if (object[field]) {
                fields[field].value = object[field];
            }
        }
        fields._object = object;
    }
}
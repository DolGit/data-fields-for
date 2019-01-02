import DataField from './DataField.jsx';
export { DataField };

export function dataFromElement(handle) {
    var el = document.getElementById(handle);
    if (!el) return false;
    var data = el.getAttribute('data');
    if (!data) return false;
    return JSON.parse(data);
}

export function errorsToFields(errors, fields) {
    for (var key in errors) {
        var field = fields[key];
        if (field) {
            field.error = true;
            field.errorText = errors[key].join(', ');
        }
    }
}

export function objectToFields(object, fields) {
    if (object) {
        for (var field in fields) {
            if (object[field]) {
                fields[field].value = object[field];
            }
        }
        fields._object = object;
    }
}
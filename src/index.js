import DataField from './DataField.js'
export {DataField}

export function dataFromElement(handle) {
    const el = document.getElementById(handle)
    if (!el) return false
    const data = el.getAttribute('data')
    if (!data) return false
    return JSON.parse(data)
}

export function errorsToFields(errors, fields) {
    for (let key in errors) {
        let field = fields[key]
        if (field) {
            field.error = true;
            field.errorText = errors[key].join(', ');
        }
    }
}

export function objectToFields(object, fields) {
    if (object) {
        for (let field in fields) {
            if (object[field]) {
                fields[field].value = object[field]
            }
        }
        fields._object = object
    }
}
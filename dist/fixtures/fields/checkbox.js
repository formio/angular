"use strict";
function CHECKBOX(key, label) {
    return {
        type: 'checkbox',
        input: true,
        tableView: false,
        hideLabel: true,
        label: label,
        key: key,
        defaultValue: false,
        protected: false,
        persistent: true,
        validate: {
            required: true
        },
        conditional: {
            show: null,
            when: null,
            eq: ""
        }
    };
}
exports.CHECKBOX = CHECKBOX;

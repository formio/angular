import { CheckBoxOptions } from '../../components/checkbox/checkbox';
export function CHECKBOX(key: string, label: string): CheckBoxOptions {
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
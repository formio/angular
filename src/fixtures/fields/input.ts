import { InputOptions } from '../../components/input/input';
export function INPUT(type: string, inputType: string, key: string, label: string): InputOptions {
    return {
        type: type,
        input: true,
        tableView: true,
        inputType: inputType,
        inputMask: '',
        label: label,
        key: key,
        placeholder: '',
        prefix: '',
        suffix: '',
        multiple: false,
        defaultValue: '',
        protected: false,
        unique: false,
        persistent: true,
        validate: {
            required: true,
            minLength: 0,
            maxLength: 0,
            pattern: '',
            custom: '',
            customPrivate: false
        },
        conditional: {
            show: '',
            when: null,
            eq: ''
        }
    };
}
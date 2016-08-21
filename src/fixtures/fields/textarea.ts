import { TextAreaOptions } from '../../components/textarea/textarea';
export function TEXTAREA(key: string, label: string): TextAreaOptions {
    return {
        input: true,
        tableView: true,
        label: label,
        key: key,
        placeholder: "Enter Your Text Here",
        prefix: "$",
        suffix: "@",
        rows: 3,
        multiple: false,
        defaultValue: "",
        protected: false,
        persistent: true,
        validate: {
            required: true,
            minLength: 8,
            maxLength: 100,
            pattern: "",
            custom: ""
        },
        type: "textarea",
        conditional: {
            show: null,
            when: null,
            eq: ""
        }
    };
}

import { TableOptions } from '../../components/table/table';
import { CHECKBOX } from './checkbox';
export const TABLE: TableOptions = {
    input: false,
    numRows: 2,
    numCols: 2,
    rows: [
        [
            {components: [CHECKBOX('checkbox', 'Checkbox')]},
            {components: [CHECKBOX('checkbox2', 'Checkbox 2')]}
        ],
        [
            {components: []},
            {components: []}
        ]
    ],
    header: [],
    caption: "",
    striped: true,
    bordered: true,
    hover: true,
    condensed: true,
    type: "table",
    conditional: {
        show: null,
        when: null,
        eq: ""
    }
};
"use strict";
var checkbox_1 = require('./checkbox');
exports.TABLE = {
    input: false,
    numRows: 2,
    numCols: 2,
    rows: [
        [
            { components: [checkbox_1.CHECKBOX('checkbox', 'Checkbox')] },
            { components: [checkbox_1.CHECKBOX('checkbox2', 'Checkbox 2')] }
        ],
        [
            { components: [] },
            { components: [] }
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

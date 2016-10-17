"use strict";
var Reflect = require('core-js/es7/reflect');
;
/**
 * Allow dynamic altering of the component templates based on what template
 * they wish to load within their Form.io renderer.
 *
 * @param cmp - The component class to alter.
 * @param template - The template to add to this component.
 * @constructor
 */
function RegisterTemplate(cmp, template) {
    //noinspection TypeScriptUnresolvedFunction
    var annotations = Reflect.getMetadata('annotations', cmp);
    annotations[0].template = template.component.template;
    if (template.component.styles) {
        annotations[0].styles = template.component.styles;
    }
    //noinspection TypeScriptUnresolvedFunction
    Reflect.defineMetadata('annotations', annotations, cmp);
}
exports.RegisterTemplate = RegisterTemplate;

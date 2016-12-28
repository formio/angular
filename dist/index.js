"use strict";
var formio_1 = require('./formio');
var bootstrap_tpl_build_1 = require('./templates/bootstrap.tpl.build');
formio_1.FormioBaseModule.setTemplate(bootstrap_tpl_build_1.FORMIO_BOOTSTRAP);
exports.FormioModule = formio_1.FormioBaseModule;

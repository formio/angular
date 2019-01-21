import { Routes, Route, RouterModule } from '@angular/router';
import { find, trim, each, intersection } from 'lodash';

export function extendRouter(Class: any, config: any, ClassRoutes: any) {
  each(Class.decorators, decorator => {
    each(decorator.args, arg => {
      if (arg.declarations) {
        each(config, component => arg.declarations.push(component));
      }
      if (arg.imports) {
        each(arg.imports, (_import, index) => {
          if (
            (_import.ngModule && (_import.ngModule.name === 'RouterModule')) ||
            (_import.name === 'RouterModule')
          ) {
            arg.imports[index] = RouterModule.forChild(ClassRoutes(config));
          }
        });
      }
    });
  });
  return Class;
}

export function submissionPermissions(formio: any, form: any, submission: any, user: any) {
  const perms = {edit: false, delete: false};
  return formio.accessInfo().then((access) => {
    for (const roleName in access.roles) {
      if (access.roles.hasOwnProperty(roleName)) {
        const role = access.roles[roleName];
        if (role.admin && user.roles.indexOf(role._id) !== -1) {
          perms.delete = true;
          perms.edit = true;
        }
      }
    }
    if (form.submissionAccess) {
      for (let i = 0; i < form.submissionAccess.length; i++) {
        const perm = form.submissionAccess[i];
        if (
          perm.type === 'delete_all' ||
          perm.type === 'delete_own' ||
          perm.type === 'edit_all' ||
          perm.type === 'edit_own'
        ) {
          if (intersection(perm.roles, user.roles).length) {
            if (perm.type === 'edit_all') {
              perms.edit = true;
            } else if (perm.type === 'delete_all') {
              perms.delete = true;
            } else if (perm.type === 'edit_own' && (user._id === submission.owner)) {
              perms.edit = true;
            } else if (perm.type === 'delete_own' && (user._id === submission.owner)) {
              perms.delete = true;
            }
          }
        }
      }
    }

    return perms;
  });
}

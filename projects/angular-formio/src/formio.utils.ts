import { RouterModule } from '@angular/router';
import { each } from 'lodash';

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
            (_import.ngModule && (_import.ngModule.name === '_RouterModule')) ||
            (_import.name === 'RouterModule') ||
            (_import.name === '_RouterModule')
          ) {
            arg.imports[index] = RouterModule.forChild(ClassRoutes(config));
          }
        });
      }
    });
  });
  return Class;
}

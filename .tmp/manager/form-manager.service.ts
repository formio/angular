import { Injectable } from '@angular/core';
import { FormioAppConfig } from '../formio.config';
import { FormManagerConfig } from './form-manager.config';
import { Formio } from 'formiojs';
import { ActivatedRoute } from '@angular/router';
import { FormioAuthService } from '../auth/auth.service';
import _each from 'lodash/each';
import _intersection from 'lodash/intersection';

@Injectable()
export class FormManagerService {
  public formio: Formio;
  public access: any;
  public allAccessMap: any;
  public ownAccessMap: any;
  public ready: Promise<any>;
  public actionAllowed: any;
  public form = null;
  public perms = {delete: false, edit: false};

  constructor(
    public appConfig: FormioAppConfig,
    public config: FormManagerConfig,
    public auth: FormioAuthService
  ) {
    if (this.appConfig && this.appConfig.appUrl) {
      Formio.setBaseUrl(this.appConfig.apiUrl);
      Formio.setProjectUrl(this.appConfig.appUrl);
    } else {
      console.error('You must provide an AppConfig within your application!');
    }

    this.allAccessMap = {
      'update_all': 'formEdit',
      'delete_all': 'formDelete'
    };
    this.ownAccessMap = {
      'update_own': 'formEdit',
      'delete_own': 'formDelete'
    };
    this.actionAllowed = (action) => this.isActionAllowed(action);
    this.reset();
  }

  isActionAllowed(action: string) {
    return this.access[action];
  }

  setAccess() {
    this.access = {
      formCreate: true,
      formView: true,
      formEdit: true,
      formDelete: true,
      submissionIndex: true
    };
    if (this.auth) {
      this.access = {
        formCreate: false,
        formView: false,
        formEdit: false,
        formDelete: false,
        submissionIndex: false
      };
      this.ready = this.auth.ready.then(() => {
        const adminRoles = [];
        _each(this.auth.roles, (role, name) => {
          if (role.admin) {
            adminRoles.push(role._id);
          }
        });
        if (this.auth.user && this.auth.user.roles) {
          this.auth.user.roles.forEach(roleId => {
            if (adminRoles.indexOf(roleId) !== -1) {
              this.access.formCreate = true;
              this.access.formView = true;
              this.access.formEdit = true;
              this.access.formDelete = true;
              this.access.submissionIndex = true;
            }
            if (!this.access.formCreate) {
              this.access.formCreate = (this.auth.formAccess.create_all.indexOf(roleId) !== -1);
            }
            if (!this.access.formView) {
              this.access.formView = (this.auth.formAccess.read_all.indexOf(roleId) !== -1);
            }
            if (!this.access.formEdit) {
              this.access.formEdit = (this.auth.formAccess.update_all.indexOf(roleId) !== -1);
            }
            if (!this.access.formDelete) {
              this.access.formDelete = (this.auth.formAccess.delete_all.indexOf(roleId) !== -1);
            }
            if (!this.access.submissionIndex) {
              this.access.submissionIndex = (this.auth.formAccess.read_all.indexOf(roleId) !== -1);
            }
          });
        }
      });
    } else {
      this.ready = Promise.resolve(false);
    }
  }

  reset(route?: ActivatedRoute) {
    if (route) {
      route.params.subscribe(params => {
        if (params.id) {
          this.formio = new Formio(`${this.formio.formsUrl}/${params.id}`);
        } else {
          this.reset();
        }
      });
    } else {
      this.formio = new Formio(this.appConfig.appUrl);
      this.setAccess();
    }
  }

  hasAccess(roles) {
    if (!this.auth.user) {
      return false;
    }
    return !!_intersection(roles, this.auth.user.roles).length;
  }

  setForm(form: any) {
    this.form = form;
    if (form.access) {
      // Check if they have access here.
      form.access.forEach(access => {
        // Check for all access.
        if (this.allAccessMap[access.type] && !this.access[this.allAccessMap[access.type]]) {
          this.access[this.allAccessMap[access.type]] = this.hasAccess(access.roles);
        }

        // Check for own access.
        if (
          this.auth && this.auth.user &&
          (form._id === this.auth.user._id) &&
          this.ownAccessMap[access.type] &&
          !this.access[this.ownAccessMap[access.type]]
        ) {
          this.access[this.ownAccessMap[access.type]] = this.hasAccess(access.roles);
        }
      });
    }
    return form;
  }

  loadForm() {
    return this.formio.loadForm().then(form => this.setForm(form));
  }

  setSubmission(route: ActivatedRoute) {
    return new Promise((resolve) => {
      route.params.subscribe(params => {
        this.formio = new Formio(`${this.formio.submissionsUrl}/${params.id}`);
        resolve(this.formio);
      });
    });
  }

  submissionLoaded(submission: any) {
    this.auth.ready.then(() => {
      this.formio.userPermissions(this.auth.user, this.form, submission).then((perms) => {
        this.perms.delete = perms.delete;
        this.perms.edit = perms.edit;
      });
    });
  }

  loadForms() {
    return this.formio.loadForms({params: {
      tags: this.config.tag
    }});
  }

  createForm(form: any) {
    return this.formio.createform(form);
  }
}

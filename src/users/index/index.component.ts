import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { each } from 'lodash';
import {FormioUsersService} from '../users.service';
import {FormioUsersConfig} from '../users.config';
import {FormioAppConfig} from '../../formio.config';
import FormioUtils from 'formiojs/utils';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormioGridComponent} from '../../grid/grid.component';

@Component({
  templateUrl: './index.component.html'
})
export class UsersIndexComponent implements OnInit {
  @ViewChild(FormioGridComponent) grid: FormioGridComponent;
  public gridSrc?: string;
  public gridQuery: any;
  public inviteForm: any;
  public inviting = false;
  public inviteSubmission: any = {data: {}};
  public createText: String;
  constructor(
    public service: FormioUsersService,
    public route: ActivatedRoute,
    public router: Router,
    public config: FormioUsersConfig,
    private modalService: NgbModal,
    public appConfig: FormioAppConfig
  ) {
  }

  refreshGrid(query?) {
    this.grid.refreshGrid(query);
  }

  ngOnInit() {
    this.gridQuery = {};
    this.service.setContext(this.route);
    this.route.params.subscribe(params => {
      this.gridSrc = `${this.appConfig.appUrl}/${params.name}`;
      const resourceName = this.capitalizeLetter(params.name);
      this.createText = `Add New ${resourceName}`;
    });
  }

  inviteUser(content) {
    this.service.loadForm().then(form => {
      this.inviteForm = form;
      FormioUtils.eachComponent(this.inviteForm.components, (component) => {
        if (component.type === 'password' || component.key === 'invited' || component.key === 'onBoarded') {
          component.hidden = true;
        }
      });
      this.inviteSubmission.data.invited = true;
      this.inviteSubmission.data.appUrl = window.location.origin;
      this.inviteSubmission.data.projectUrl = encodeURIComponent(this.service.formio.projectUrl);
    });
    this.modalService.open(content, { size: 'lg' });
  }

  capitalizeLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  onSelect(row: any) {
    this.router.navigate([row._id, 'view'], { relativeTo: this.route });
  }

  sendInvite(submission, modal) {
    this.inviting = true;
    this.service.save(submission).then(() => {
      this.inviteSubmission = {data: {}};
      this.refreshGrid();
      setTimeout(() => {
        this.inviting = false;
        modal.close('done');
      }, 2000);
    });
  }

  onCreateItem() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }
}

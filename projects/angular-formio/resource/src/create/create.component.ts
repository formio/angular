import { Component, EventEmitter, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { FormioResourceService } from '../resource.service';
import { FormioResourceConfig } from '../resource.config';
import { NgIf } from '@angular/common';
import { FormioComponent } from '@formio/angular';

@Component({
  styleUrls: ['./create.component.scss'],
  templateUrl: './create.component.html',
    imports: [NgIf, RouterLink, FormioComponent]
})
export class FormioResourceCreateComponent implements OnInit {
  public onError: EventEmitter<any>;
  public onSuccess: EventEmitter<any>;
  constructor(
    public service: FormioResourceService,
    public route: ActivatedRoute,
    public router: Router,
    public config: FormioResourceConfig
  ) {
    this.onError = new EventEmitter();
    this.onSuccess = new EventEmitter();
  }

  ngOnInit(): void {
    this.service.init(this.route);
  }

  onSubmit(submission: any) {
    this.service
      .save(submission)
      .then(() => {
        this.router.navigate(['../', this.service.resource._id, 'view'], {
          relativeTo: this.route
        });
      })
      .catch((err: any) => this.onError.emit(err));
  }
}

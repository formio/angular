import { Component, OnInit } from '@angular/core';
import { FormManagerService } from '../form-manager.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './form.component.html'
})
export class FormManagerFormComponent implements OnInit {

  constructor(
    public service: FormManagerService,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.service.reset(this.route);
  }
}

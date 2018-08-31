import { Component, OnInit } from '@angular/core';
import { FormManagerService } from '../../form-manager.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './submission.component.html'
})
export class SubmissionComponent implements OnInit {
  constructor(
    public service: FormManagerService,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.service.setSubmission(this.route);
  }
}

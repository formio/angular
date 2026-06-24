import { Component, OnInit } from '@angular/core';
import { FormManagerService } from '../../form-manager.service';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  templateUrl: './submission.component.html',
  imports: [RouterLink, RouterLinkActive, RouterOutlet]
})
export class SubmissionComponent implements OnInit {
  public downloadUrl: string;
  constructor(
    public service: FormManagerService,
    public route: ActivatedRoute
  ) { }

  setDownloadUrl(url) {
    this.downloadUrl = url;
  }

  ngOnInit() {
    this.service.setSubmission(this.route).then((formio: any) => {
      formio.getDownloadUrl().then((url) => this.setDownloadUrl(url));
    });
  }
}

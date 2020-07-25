import {Component} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormManagerService } from '../../form-manager.service';
import {FormioUtils} from '../../../core';
import {Papa} from 'ngx-papaparse';

@Component({
  templateUrl: './index.component.html'
})
export class SubmissionIndexComponent {
  public progressText = '';
  constructor(
    public service: FormManagerService,
    public route: ActivatedRoute,
    public router: Router,
    public papa: Papa
  ) {}

  onSelect(row: any) {
    this.router.navigate([row._id, 'view'], {relativeTo: this.route});
  }
  downloadCSV() {
    this.progressText = 'Loading Data... 10%';
    this.service.formio.loadSubmissions({params: {limit: 999999}}).then((submissions) => {
      this.service.formio.loadForm().then((form) => {
        const headers = [];
        // TODO: Dynamic headers using labels.
        FormioUtils.eachComponent(form.components, (component) => {
          if (component.tableView && component.input) {
            headers.push(component.key);
          }
        });
        const exportedData = new Array(submissions.length);
        for (let i = 0; i < submissions.length; i++) {
          const submission = submissions[i];
          exportedData[i] = {};
          headers.forEach((head) => {
            for (let u in submission.data) {
              exportedData[i][head] = submission.data[head];
            }
          });
          exportedData[i].created = submission.created.replace('T', ' ');
          exportedData[i].modified = submission.modified.replace('T', ' ');
        }
        this.downloadFile(exportedData, 'export');
      });
    });
  }

  downloadFile(data, filename = 'data') {
    this.progressText = 'Converting... 30%';
    let csvData = this.papa.unparse(data);
    this.progressText = 'Converting... 100%';
    let blob = new Blob(['\ufeff' + csvData], { type: 'text/csv;charset=utf-8;' });
    let dwldLink = document.createElement('a');
    let url = URL.createObjectURL(blob);
    let isSafariBrowser = navigator.userAgent.indexOf('Safari') !== -1 && navigator.userAgent.indexOf('Chrome') == -1;
    if (isSafariBrowser) {  // if Safari open in new window to save file with random filename.
      dwldLink.setAttribute('target', '_blank');
    }
    dwldLink.setAttribute('href', url);
    dwldLink.setAttribute('download', filename + '.csv');
    dwldLink.style.visibility = 'hidden';
    this.progressText = 'Downloading... 100%';
    document.body.appendChild(dwldLink);
    dwldLink.click();
    document.body.removeChild(dwldLink);
    this.progressText = '';
  }
}

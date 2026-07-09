import { ChangeDetectorRef, Component, inject, OnDestroy } from '@angular/core';
import { FormioResourceService } from '../resource.service';
import { FormioResourceConfig } from '../resource.config';
import { Formio } from '@formio/js';
import { FormioComponent } from '@formio/angular';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: './view.component.html',
  imports: [FormioComponent],
})
export class FormioResourceViewComponent implements OnDestroy {
  public submission = { data: {} };
  private changeDetectorRef: ChangeDetectorRef = inject(ChangeDetectorRef);
  private refreshSubscription = new Subscription();

  constructor(
    public service: FormioResourceService,
    public config: FormioResourceConfig,
  ) {
    this.service?.resourceLoaded?.then(() => this.changeDetectorRef.markForCheck());
    if (this.service?.refresh) {
      this.refreshSubscription.add(
        this.service.refresh.subscribe(() => this.changeDetectorRef.markForCheck()),
      );
    }
  }

  ngOnDestroy() {
    this.refreshSubscription.unsubscribe();
    Formio.clearCache();
  }
}

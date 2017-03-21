import { SimpleForm } from './simple';
import { WizardForm } from './wizard';
import { KitchenSinkForm } from './kitchen';
export const FormRoutes: any = [
  {
    path: '',
    redirectTo: 'simple',
    pathMatch: 'full'
  },
  {
    path: 'simple',
    title: 'Simple Form',
    component: SimpleForm
  },
  {
    path: 'wizard',
    title: 'Wizard Form',
    component: WizardForm
  },
  {
    path: 'kitchen',
    title: 'Kitchen Sink',
    component: KitchenSinkForm
  }
];

export const FormComponents: Array<any> = [
  SimpleForm,
  WizardForm,
  KitchenSinkForm
];

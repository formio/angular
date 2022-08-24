import { ComponentInstance } from '@heybaton/formio-ng';

export interface GridColumn {
  label?: string;
  path: string;
  renderCell?(cellValue: any, component?: ComponentInstance): string;
}

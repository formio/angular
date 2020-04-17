import { ComponentInstance } from '../../formio.common';

export interface GridColumn {
  label?: string;
  path: string;
  renderCell?(cellValue: any, component?: ComponentInstance): string;
}

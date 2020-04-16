import {ComponentInstance} from '../../formio.common';

export interface GridHeader {
  component?: ComponentInstance;
  path: string;
  sort?: any;
  label: string;
  renderCell?(cellValue: any, component?: ComponentInstance): string;
}

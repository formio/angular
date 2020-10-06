import FormioMetadata from './formio-metadata';

export default interface FormioSubmission<T = any, stateType= FormioSubmissionState > {
  _id?: string;
  created?: string;
  data?: T;
  form?: string;
  metadata?: FormioMetadata;
  modified?: string;
  owner?: string;
  project?: string;
  state?: stateType;
  _fvid?: number;
  _vid?: number;
}

export enum FormioSubmissionState  {
  draft = 'draft',
  submitted = 'submitted'
}

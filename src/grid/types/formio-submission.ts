export default interface FormioSubmission<T = any, stateType= state> {
  _id?: string;
  created?: string;
  data?: T;
  form?: string;
  modified?: string;
  owner?: string;
  project?: string;
  state?: stateType;
  _fvid?: number;
  _vid?: number;
}

enum state {
  draft = 'draft',
  submitted = 'submitted'
}

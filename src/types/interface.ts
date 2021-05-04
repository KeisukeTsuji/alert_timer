export interface SelectTime {
  HH: null | string;
  mm: null | string;
}
export interface AlertList {
  id: string;
  contents: string;
  selectTime: SelectTime;
}

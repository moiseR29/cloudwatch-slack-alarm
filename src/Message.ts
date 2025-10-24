export interface FieldItem {
  title: string;
  value: 'string';
  short: boolean;
}

export interface Attachments {
  fields: Array<FieldItem>;
  color: string;
  ts: number;
}

export interface Message {
  text: string;
  attachments: Array<Attachments>;
}

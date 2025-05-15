export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Attachment {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
}

export interface Email {
  id: string;
  from: User;
  to: User[];
  cc?: User[];
  bcc?: User[];
  subject: string;
  body: string;
  attachments?: Attachment[];
  date: Date;
  read: boolean;
  starred: boolean;
  important?: boolean;
  labels?: string[];
  replied?: boolean;
  forwarded?: boolean;
  groupId?: string;
}

export interface EmailGroup {
  id: string;
  name: string;
  description?: string;
  members: User[];
}

export interface Label {
  id: string;
  name: string;
  color: string;
}

export type EmailFolder = 'inbox' | 'important' | 'starred' | 'sent' | 'drafts' | 'deleted' | 'spam';

export interface EmailState {
  emails: Email[];
  selectedEmail: Email | null;
  showEmailDetail: boolean;
  showComposeModal: boolean;
  currentFolder: EmailFolder;
  labels: Label[];
  groups: EmailGroup[];
  composeData: {
    to: User[];
    cc: User[];
    bcc: User[];
    subject: string;
    body: string;
    attachments: Attachment[];
    groupId?: string;
  };
}
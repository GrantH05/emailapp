import type { Email, Label, EmailGroup, User } from '../types';

export const currentUser: User = {
  id: '1',
  name: 'James Hong',
  email: 'jrh343@example.com',
  avatar: 'https://img.freepik.com/free-vector/user-blue-gradient_78370-4692.jpg',
};

export const users: User[] = [
  currentUser,
  {
    id: '2',
    name: 'Justin Lapointe',
    email: 'justin.l@example.com',
    avatar: 'https://img.freepik.com/free-vector/user-blue-gradient_78370-4692.jpg',
  },
  {
    id: '3',
    name: 'Rufana',
    email: 'rufana@example.com',
    avatar: 'https://img.freepik.com/free-vector/user-blue-gradient_78370-4692.jpg',
  },
  {
    id: '4',
    name: 'Cameron Drake',
    email: 'cameron.d@example.com',
    avatar: 'https://img.freepik.com/free-vector/user-blue-gradient_78370-4692.jpg',
  },
  {
    id: '5',
    name: 'Sean Hill',
    email: 'sean.hill@example.com',
    avatar: 'https://img.freepik.com/free-vector/user-blue-gradient_78370-4692.jpg',
  },
];

export const labels: Label[] = [
  { id: 'team-events', name: 'Team Events', color: '#10b981' },
  { id: 'work', name: 'Work', color: '#f59e0b' },
  { id: 'external', name: 'External', color: '#ef4444' },
  { id: 'projects', name: 'Projects', color: '#3b82f6' },
  { id: 'applications', name: 'Applications', color: '#8b5cf6' },
];

export const groups: EmailGroup[] = [
  {
    id: 'marketing',
    name: 'Marketing Team',
    description: 'Group for marketing discussions',
    members: [users[0], users[1], users[2]],
  },
  {
    id: 'development',
    name: 'Dev Team',
    description: 'Development team communications',
    members: [users[0], users[3], users[4]],
  },
  {
    id: 'leadership',
    name: 'Leadership',
    description: 'Executive communications',
    members: [users[0], users[2], users[4]],
  },
];

export const mockEmails: Email[] = [
  {
    id: '1',
    from: users[1],
    to: [currentUser],
    subject: 'Client Dashboard',
    body: 'It seems that recipients are receiving notification emails for every update to the client dashboard. We should probably adjust the notification settings to only send emails for major updates.',
    date: new Date('2023-05-15T15:13:00'),
    read: false,
    starred: false,
    labels: ['projects'],
    attachments: [],
  },
  {
    id: '2',
    from: users[2],
    to: [currentUser],
    subject: 'UI project',
    body: 'Regardless, you can usually expect an increase in engagement when we update the UI to be more intuitive. The mockups look great, and I think we should proceed with the implementation.',
    date: new Date('2023-05-15T15:13:00'),
    read: false,
    starred: true,
    labels: ['applications'],
    attachments: [
      {
        id: 'a1',
        name: 'UI_Mockups.pdf',
        size: 2500000,
        type: 'application/pdf',
        url: '#',
      }
    ],
  },
  {
    id: '3',
    from: users[3],
    to: [currentUser],
    subject: "You're missing",
    body: "Here are a few catchy email subject line examples that might help improve our email open rates. I've attached a PDF with more extensive examples and statistics.",
    date: new Date('2023-05-15T15:13:00'),
    read: false,
    starred: false,
    labels: ['external'],
    attachments: [
      {
        id: 'a2',
        name: 'Email_Subject_Examples.pdf',
        size: 1200000,
        type: 'application/pdf',
        url: '#',
      }
    ],
  },
  {
    id: '4',
    from: users[4],
    to: [currentUser],
    subject: 'How Have You Progressed',
    body: 'You can write effective retargeting subject lines by personalizing them based on customer behavior. For example, "James, take another look at your cart" is more effective than generic subject lines.',
    date: new Date('2023-05-15T15:13:00'),
    read: false,
    starred: false,
    labels: ['team-events'],
    attachments: [],
  },
  {
    id: '5',
    from: users[2],
    to: [currentUser],
    subject: 'Weekly progress update',
    body: 'Here is the weekly progress update for the ongoing projects. All teams are on track to meet their deadlines.',
    date: new Date('2023-05-14T10:30:00'),
    read: true,
    starred: false,
    labels: ['work'],
    attachments: [
      {
        id: 'a3',
        name: 'Weekly_Report.xlsx',
        size: 550000,
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        url: '#',
      }
    ],
  },
];

export const sentEmails: Email[] = [
  {
    id: 's1',
    from: currentUser,
    to: [users[1]],
    subject: 'Re: Client Dashboard',
    body: 'Thanks for bringing this to my attention. I\'ll look into adjusting the notification settings right away. I think we should only send emails for major updates or when specific actions are required.',
    date: new Date('2023-05-15T15:45:00'),
    read: true,
    starred: false,
    labels: ['projects'],
    replied: true,
    attachments: [],
  },
  {
    id: 's2',
    from: currentUser,
    to: [users[2], users[3]],
    cc: [users[4]],
    subject: 'Monthly team meeting',
    body: 'Our monthly team meeting is scheduled for next Friday at 2 PM. Please prepare your updates and let me know if you have specific topics you\'d like to discuss.',
    date: new Date('2023-05-14T09:15:00'),
    read: true,
    starred: false,
    labels: ['team-events'],
    attachments: [
      {
        id: 'a4',
        name: 'Meeting_Agenda.docx',
        size: 350000,
        type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        url: '#',
      }
    ],
  },
];

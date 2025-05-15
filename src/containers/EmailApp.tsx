import React, { useState } from 'react';
import { Pen } from 'lucide-react';
import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header';
import EmailList from '../components/email/EmailList';
import EmailDetail from '../components/email/EmailDetail';
import ComposeEmail from '../components/email/ComposeEmail';
import Modal from '../components/ui/Modal';
import Button from '../components/ui/Button';
import type { EmailState, EmailFolder, Email } from '../types';
import { currentUser, mockEmails, sentEmails, labels, groups, users } from '../data/mockData';

const EmailApp: React.FC = () => {
  const [state, setState] = useState<EmailState>({
    emails: mockEmails,
    selectedEmail: null,
    showEmailDetail: false,
    showComposeModal: false,
    currentFolder: 'inbox',
    labels: labels,
    groups: groups,
    composeData: {
      to: [],
      cc: [],
      bcc: [],
      subject: '',
      body: '',
      attachments: [],
    },
  });

  const handleFolderChange = (folder: string) => {
    setState({
      ...state,
      currentFolder: folder as EmailFolder,
      selectedEmail: null,
      showEmailDetail: false,
    });
  };

  const handleSelectEmail = (email: Email) => {
    setState({
      ...state,
      selectedEmail: email,
      showEmailDetail: true,
      emails: state.emails.map(e => 
        e.id === email.id ? { ...e, read: true } : e
      ),
    });
  };

  const handleCloseEmailDetail = () => {
    setState({
      ...state,
      showEmailDetail: false,
      selectedEmail: null,
    });
  };

  const handleOpenCompose = () => {
    setState({
      ...state,
      showComposeModal: true,
    });
  };

  const handleCloseCompose = () => {
    setState({
      ...state,
      showComposeModal: false,
    });
  };

  const handleSendEmail = (data: {
    to: typeof users;
    cc: typeof users;
    bcc: typeof users;
    subject: string;
    body: string;
    attachments: any[];
    groupId?: string;
  }) => {
    const newEmail: Email = {
      id: `sent-${Date.now()}`,
      from: currentUser,
      to: data.to,
      cc: data.cc,
      bcc: data.bcc,
      subject: data.subject,
      body: data.body,
      attachments: data.attachments,
      date: new Date(),
      read: true,
      starred: false,
      important: false,
    };

    // In a real app, we would send this to an API
    console.log('Sending email:', newEmail);

    // Add to sent emails
    sentEmails.unshift(newEmail);

    setState({
      ...state,
      showComposeModal: false,
    });
  };

  const handleStarEmail = (emailId: string) => {
    setState({
      ...state,
      emails: state.emails.map(email => 
        email.id === emailId ? { ...email, starred: !email.starred } : email
      ),
    });
  };

  const handleDeleteEmail = (email: Email) => {
    // In a real app, mark as deleted or move to trash
    setState({
      ...state,
      emails: state.emails.filter(e => e.id !== email.id),
      showEmailDetail: false,
      selectedEmail: null,
    });
  };

  const handleReplyEmail = (email: Email) => {
    setState({
      ...state,
      showComposeModal: true,
      composeData: {
        to: [email.from],
        cc: [],
        bcc: [],
        subject: `Re: ${email.subject}`,
        body: `\n\n-------- Original Message --------\nFrom: ${email.from.name}\nDate: ${email.date.toLocaleString()}\nSubject: ${email.subject}\n\n${email.body}`,
        attachments: [],
      },
    });
  };

  const handleForwardEmail = (email: Email) => {
    setState({
      ...state,
      showComposeModal: true,
      composeData: {
        to: [],
        cc: [],
        bcc: [],
        subject: `Fwd: ${email.subject}`,
        body: `\n\n-------- Forwarded Message --------\nFrom: ${email.from.name}\nDate: ${email.date.toLocaleString()}\nSubject: ${email.subject}\n\n${email.body}`,
        attachments: email.attachments || [],
      },
    });
  };

  // Get appropriate emails based on current folder
  const getEmails = () => {
    switch (state.currentFolder) {
      case 'inbox':
        return mockEmails;
      case 'sent':
        return sentEmails;
      case 'starred':
        return mockEmails.filter(email => email.starred);
      case 'important':
        return mockEmails.filter(email => email.important);
      /*case 'drafts':
        return mockEmails.filter(email => email.draft);
      case 'deleted':
        return mockEmails.filter(email => email.deleted);
      case 'spam':
        return mockEmails.filter(email => email.spam);*/
      default:
        return mockEmails;
    }
  };

  const currentEmails = getEmails();
  const unreadCount = mockEmails.filter(email => !email.read).length;
  const starredCount = mockEmails.filter(email => email.starred).length;
  const importantCount = mockEmails.filter(email => email.important).length;

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-gray-50">
      <Header 
        user={currentUser}
        unreadEmails={unreadCount}
        unreadMessages={3}
        unreadNotifications={2}
      />
      
      <div className="flex-grow flex overflow-hidden">
        <Sidebar 
          unreadCount={unreadCount}
          starredCount={starredCount}
          sentCount={sentEmails.length}
          draftsCount={0}
          deletedCount={0}
          spamCount={0}
          importantCount={importantCount}
          currentFolder={state.currentFolder}
          onFolderChange={handleFolderChange}
        />
        
        <div className="flex-grow flex flex-col overflow-hidden">
          <div className="p-4 bg-white border-b">
            <Button
              variant="primary"
              icon={<Pen size={18} />}
              onClick={handleOpenCompose}
              className="bg-orange-500 hover:bg-orange-600"
            >
              Compose
            </Button>
          </div>
          
          <div className="flex-grow overflow-hidden flex">
            <div className={`${state.showEmailDetail ? 'hidden md:block md:w-1/2 lg:w-2/5' : 'w-full'} bg-white border-r overflow-hidden`}>
              <EmailList
                title={state.currentFolder.charAt(0).toUpperCase() + state.currentFolder.slice(1)}
                emails={currentEmails}
                labels={state.labels}
                totalCount={currentEmails.length}
                unreadCount={unreadCount}
                selectedEmail={state.selectedEmail}
                onSelectEmail={handleSelectEmail}
                onStarEmail={handleStarEmail}
              />
            </div>
            
            {state.showEmailDetail && state.selectedEmail && (
              <div className="w-full md:w-1/2 lg:w-3/5 bg-white overflow-hidden">
                <EmailDetail
                  email={state.selectedEmail}
                  labels={state.labels}
                  onClose={handleCloseEmailDetail}
                  onReply={handleReplyEmail}
                  onForward={handleForwardEmail}
                  onDelete={handleDeleteEmail}
                  onStar={() => handleStarEmail(state.selectedEmail!.id)}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Modal
        isOpen={state.showComposeModal}
        onClose={handleCloseCompose}
        title="Compose Email"
        size="lg"
      >
        <ComposeEmail
          onClose={handleCloseCompose}
          onSend={handleSendEmail}
          users={users}
          groups={groups}
          initialData={state.composeData}
        />
      </Modal>
    </div>
  );
};

export default EmailApp;
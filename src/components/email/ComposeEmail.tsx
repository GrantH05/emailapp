import React, { useState } from 'react';
import { X, Paperclip, ChevronDown, Users } from 'lucide-react';
import type { User, EmailGroup, Attachment } from '../../types';
import Button from '../ui/Button';
import Avatar from '../ui/Avatar';

interface ComposeEmailProps {
  onClose: () => void;
  onSend: (data: {
    to: User[];
    cc: User[];
    bcc: User[];
    subject: string;
    body: string;
    attachments: Attachment[];
    groupId?: string;
  }) => void;
  users: User[];
  groups: EmailGroup[];
  initialData?: {
    to?: User[];
    cc?: User[];
    bcc?: User[];
    subject?: string;
    body?: string;
  };
}

const ComposeEmail: React.FC<ComposeEmailProps> = ({
  onClose,
  onSend,
  users,
  groups,
  initialData,
}) => {
  const [to, setTo] = useState<User[]>(initialData?.to || []);
  const [cc, setCc] = useState<User[]>(initialData?.cc || []);
  const [bcc, setBcc] = useState<User[]>(initialData?.bcc || []);
  const [subject, setSubject] = useState(initialData?.subject || '');
  const [body, setBody] = useState(initialData?.body || '');
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<EmailGroup | null>(null);
  const [showCc, setShowCc] = useState(initialData?.cc && initialData.cc.length > 0);
  const [showBcc, setShowBcc] = useState(initialData?.bcc && initialData.bcc.length > 0);
  const [showGroupDropdown, setShowGroupDropdown] = useState(false);

  const handleAttachmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newAttachments = Array.from(e.target.files).map((file) => ({
        id: `temp-${Math.random().toString(36).substring(2, 9)}`,
        name: file.name,
        size: file.size,
        type: file.type,
        url: URL.createObjectURL(file),
      }));
      setAttachments([...attachments, ...newAttachments]);
    }
  };

  const removeAttachment = (id: string) => {
    setAttachments(attachments.filter(attachment => attachment.id !== id));
  };

  const handleSelectGroup = (group: EmailGroup) => {
    setSelectedGroup(group);
    setTo(group.members);
    setShowGroupDropdown(false);
  };

  const removeRecipient = (user: User, type: 'to' | 'cc' | 'bcc') => {
    if (type === 'to') {
      setTo(to.filter(u => u.id !== user.id));
    } else if (type === 'cc') {
      setCc(cc.filter(u => u.id !== user.id));
    } else if (type === 'bcc') {
      setBcc(bcc.filter(u => u.id !== user.id));
    }
  };

  const handleSend = () => {
    onSend({
      to,
      cc,
      bcc,
      subject,
      body,
      attachments,
      groupId: selectedGroup?.id,
    });
  };

  const formatBytes = (bytes: number, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b flex items-center justify-between">
        <h2 className="text-lg font-medium">New Message</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition-colors">
          <X size={20} />
        </button>
      </div>
      
      <div className="p-4 flex-grow overflow-y-auto">
        <div className="mb-4 relative">
          <div className="flex justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700">Group Email</label>
            <button
              type="button"
              className="text-sm text-blue-600 hover:text-blue-800"
              onClick={() => setShowCc(!showCc)}
            >
              {showCc ? 'Hide CC' : 'Add CC'}
            </button>
          </div>
          
          <div className="relative">
            <button
              type="button"
              className="w-full flex items-center justify-between px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm bg-white hover:bg-gray-50"
              onClick={() => setShowGroupDropdown(!showGroupDropdown)}
            >
              <div className="flex items-center">
                <Users size={18} className="text-gray-400 mr-2" />
                <span>{selectedGroup ? selectedGroup.name : 'Select Group'}</span>
              </div>
              <ChevronDown size={16} />
            </button>
            
            {showGroupDropdown && (
              <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md border border-gray-200 max-h-60 overflow-y-auto">
                <ul className="py-1">
                  {groups.map((group) => (
                    <li key={group.id}>
                      <button
                        type="button"
                        className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center"
                        onClick={() => handleSelectGroup(group)}
                      >
                        <Users size={16} className="text-gray-400 mr-2" />
                        <div>
                          <p className="font-medium">{group.name}</p>
                          <p className="text-xs text-gray-500">{group.members.length} members</p>
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">To:</label>
          <div className="flex flex-wrap items-center gap-2 p-2 border border-gray-300 rounded-md min-h-10">
            {to.map((user) => (
              <div 
                key={user.id}
                className="bg-blue-100 text-blue-800 rounded-md py-1 px-2 text-sm flex items-center gap-1"
              >
                {user.name}
                <button
                  type="button"
                  onClick={() => removeRecipient(user, 'to')}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
            <input
              type="text"
              className="flex-grow outline-none text-sm min-w-[100px]"
              placeholder={to.length === 0 ? "Enter recipients..." : ""}
            />
          </div>
        </div>
        
        {showCc && (
          <div className="mb-4">
            <div className="flex justify-between mb-1">
              <label className="block text-sm font-medium text-gray-700">CC:</label>
              <button
                type="button"
                className="text-sm text-blue-600 hover:text-blue-800"
                onClick={() => setShowBcc(!showBcc)}
              >
                {showBcc ? 'Hide BCC' : 'Add BCC'}
              </button>
            </div>
            <div className="flex flex-wrap items-center gap-2 p-2 border border-gray-300 rounded-md min-h-10">
              {cc.map((user) => (
                <div 
                  key={user.id}
                  className="bg-blue-100 text-blue-800 rounded-md py-1 px-2 text-sm flex items-center gap-1"
                >
                  {user.name}
                  <button
                    type="button"
                    onClick={() => removeRecipient(user, 'cc')}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
              <input
                type="text"
                className="flex-grow outline-none text-sm min-w-[100px]"
                placeholder={cc.length === 0 ? "Enter CC recipients..." : ""}
              />
            </div>
          </div>
        )}
        
        {showBcc && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">BCC:</label>
            <div className="flex flex-wrap items-center gap-2 p-2 border border-gray-300 rounded-md min-h-10">
              {bcc.map((user) => (
                <div 
                  key={user.id}
                  className="bg-blue-100 text-blue-800 rounded-md py-1 px-2 text-sm flex items-center gap-1"
                >
                  {user.name}
                  <button
                    type="button"
                    onClick={() => removeRecipient(user, 'bcc')}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
              <input
                type="text"
                className="flex-grow outline-none text-sm min-w-[100px]"
                placeholder={bcc.length === 0 ? "Enter BCC recipients..." : ""}
              />
            </div>
          </div>
        )}
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Subject:</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter subject..."
          />
        </div>
        
        <div className="mb-4">
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md h-60 resize-none"
            placeholder="Compose your email..."
          />
        </div>
        
        {attachments.length > 0 && (
          <div className="mb-4 border rounded-md p-3">
            <h3 className="text-sm font-medium mb-2">Attachments</h3>
            <div className="space-y-2">
              {attachments.map((attachment) => (
                <div 
                  key={attachment.id}
                  className="flex items-center justify-between p-2 bg-gray-50 rounded-md"
                >
                  <div className="flex items-center">
                    <div className="mr-3 bg-gray-200 p-2 rounded-md">
                      <Paperclip size={16} className="text-gray-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{attachment.name}</p>
                      <p className="text-xs text-gray-500">{formatBytes(attachment.size)}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeAttachment(attachment.id)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <X size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      <div className="border-t p-4 flex justify-between">
        <div className="flex items-center gap-3">
          <Button 
            variant="primary"
            onClick={handleSend}
          >
            Send
          </Button>
          
          <label className="cursor-pointer">
            <input
              type="file"
              multiple
              className="hidden"
              onChange={handleAttachmentChange}
            />
            <div className="flex items-center gap-1 text-gray-600 hover:text-gray-900 transition-colors">
              <Paperclip size={18} />
              <span className="text-sm">Attach</span>
            </div>
          </label>
        </div>
        
        <Button
          variant="ghost"
          onClick={onClose}
        >
          Discard
        </Button>
      </div>
    </div>
  );
};

export default ComposeEmail;
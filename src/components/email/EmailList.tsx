import React from 'react';
import { RefreshCw, Filter, MoreHorizontal } from 'lucide-react';
import EmailItem from './EmailItem';
import type { Email, Label } from '../../types';

interface EmailListProps {
  title: string;
  emails: Email[];
  labels: Label[];
  totalCount: number;
  unreadCount: number;
  selectedEmail: Email | null;
  onSelectEmail: (email: Email) => void;
  onStarEmail: (emailId: string) => void;
}

const EmailList: React.FC<EmailListProps> = ({
  title,
  emails,
  labels,
  totalCount,
  unreadCount,
  selectedEmail,
  onSelectEmail,
  onStarEmail,
}) => {
  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-xl font-semibold">{title}</h1>
          <div className="relative">
            <input
              type="text"
              placeholder="Search Email"
              className="pl-8 pr-4 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 w-60"
            />
            <svg
              className="w-4 h-4 absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
        
        <div className="flex items-center text-sm text-gray-600">
          <div>
            {totalCount} Emails {unreadCount > 0 && `• ${unreadCount} Unread`}
          </div>
          
          <div className="ml-auto flex items-center gap-4">
            <button className="flex items-center gap-1 hover:text-gray-900 transition-colors">
              <RefreshCw size={14} />
              <span>Refresh</span>
            </button>
            
            <button className="flex items-center gap-1 hover:text-gray-900 transition-colors">
              <Filter size={14} />
              <span>Filter</span>
            </button>
            
            <button className="hover:text-gray-900 transition-colors">
              <MoreHorizontal size={16} />
            </button>
          </div>
        </div>
      </div>
      
      <div className="flex-grow overflow-y-auto">
        {emails.length > 0 ? (
          <div>
            {emails.map((email) => (
              <EmailItem
                key={email.id}
                email={email}
                labels={labels}
                isSelected={selectedEmail?.id === email.id}
                onClick={() => onSelectEmail(email)}
                onStar={() => onStarEmail(email.id)}
              />
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <p className="text-gray-500 mb-2">No emails found</p>
              <p className="text-sm text-gray-400">Try changing your search or filters</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailList;
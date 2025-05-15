import React, { useState } from 'react';
import { Mail, Star, Send, FileText, Trash2, AlertCircle, ChevronDown, ChevronRight, Hash, MessageSquare, Calendar, CheckSquare, FileBox, BarChart4, Users, AlertTriangle, Flag } from 'lucide-react';
import Badge from '../ui/Badge';

interface SidebarProps {
  unreadCount: number;
  starredCount: number;
  sentCount: number;
  draftsCount: number;
  deletedCount: number;
  spamCount: number;
  importantCount: number;
  currentFolder: string;
  onFolderChange: (folder: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  unreadCount,
  starredCount,
  sentCount,
  draftsCount,
  deletedCount,
  spamCount,
  importantCount,
  currentFolder,
  onFolderChange,
}) => {
  const [expandedSections, setExpandedSections] = useState<{
    apps: boolean;
    emails: boolean;
    labels: boolean;
  }>({
    apps: true,
    emails: true,
    labels: false,
  });

  const toggleSection = (section: 'apps' | 'emails' | 'labels') => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section],
    });
  };

  return (
    <div className="bg-white w-64 h-full overflow-y-auto border-r flex flex-col">
      <div className="p-4 flex items-center">
        <div className="text-red-500 mr-2">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 3L19.2 7.5V16.5L12 21L4.8 16.5V7.5L12 3Z" fill="currentColor" />
          </svg>
        </div>
        <span className="font-bold text-lg">SmartHR</span>
      </div>

      <div className="px-4 py-2 text-xs font-semibold text-gray-500">MAIN MENU</div>

      <div className="flex-1 px-4">
        <button
          className={`w-full flex items-center gap-2 py-2 px-3 rounded-lg transition-colors ${
            false ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-100'
          }`}
        >
          <BarChart4 size={18} />
          <span>Dashboard</span>
          <span className="ml-auto bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-md">Hot</span>
        </button>

        <div className="mt-2">
          <button
            className="w-full flex items-center gap-2 py-2 px-3 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => toggleSection('apps')}
          >
            {expandedSections.apps ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
            <Users size={18} />
            <span>Applications</span>
          </button>
          
          {expandedSections.apps && (
            <div className="ml-8 mt-1 space-y-1">
              <button className="w-full text-left py-1 px-3 text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
                Chat
              </button>
              <button className="w-full text-left py-1 px-3 text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
                Calls
              </button>
              <button className="w-full text-left py-1 px-3 text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
                Calendar
              </button>
              <button className="w-full text-left py-1 px-3 text-gray-700 hover:bg-gray-100 rounded-md transition-colors font-medium text-orange-500">
                Email
              </button>
              <button className="w-full text-left py-1 px-3 text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
                To Do
              </button>
              <button className="w-full text-left py-1 px-3 text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
                Notes
              </button>
              <button className="w-full text-left py-1 px-3 text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
                Social Feed
              </button>
              <button className="w-full text-left py-1 px-3 text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
                File Manager
              </button>
              <button className="w-full text-left py-1 px-3 text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
                Kanban
              </button>
              <button className="w-full text-left py-1 px-3 text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
                Invoices
              </button>
            </div>
          )}
        </div>

        <div className="mt-4">
          <div className="px-3 py-2 text-xs font-semibold text-gray-500">EMAIL</div>
          <div className="space-y-1">
            <button 
              className={`w-full flex items-center justify-between py-1 px-3 rounded-md transition-colors ${
                currentFolder === 'inbox' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => onFolderChange('inbox')}
            >
              <div className="flex items-center gap-2">
                <Mail size={16} />
                <span>Inbox</span>
              </div>
              {unreadCount > 0 && (
                <span className="bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">{unreadCount}</span>
              )}
            </button>

            <button 
              className={`w-full flex items-center justify-between py-1 px-3 rounded-md transition-colors ${
                currentFolder === 'important' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => onFolderChange('important')}
            >
              <div className="flex items-center gap-2">
                <Flag size={16} />
                <span>Important</span>
              </div>
              {importantCount > 0 && (
                <span className="text-gray-500 text-xs">{importantCount}</span>
              )}
            </button>
            
            <button 
              className={`w-full flex items-center justify-between py-1 px-3 rounded-md transition-colors ${
                currentFolder === 'starred' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => onFolderChange('starred')}
            >
              <div className="flex items-center gap-2">
                <Star size={16} />
                <span>Starred</span>
              </div>
              {starredCount > 0 && (
                <span className="text-gray-500 text-xs">{starredCount}</span>
              )}
            </button>
            
            <button 
              className={`w-full flex items-center justify-between py-1 px-3 rounded-md transition-colors ${
                currentFolder === 'sent' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => onFolderChange('sent')}
            >
              <div className="flex items-center gap-2">
                <Send size={16} />
                <span>Sent</span>
              </div>
              {sentCount > 0 && (
                <span className="text-gray-500 text-xs">{sentCount}</span>
              )}
            </button>
            
            <button 
              className={`w-full flex items-center justify-between py-1 px-3 rounded-md transition-colors ${
                currentFolder === 'drafts' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => onFolderChange('drafts')}
            >
              <div className="flex items-center gap-2">
                <FileText size={16} />
                <span>Drafts</span>
              </div>
              {draftsCount > 0 && (
                <span className="text-gray-500 text-xs">{draftsCount}</span>
              )}
            </button>
            
            <button 
              className={`w-full flex items-center justify-between py-1 px-3 rounded-md transition-colors ${
                currentFolder === 'deleted' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => onFolderChange('deleted')}
            >
              <div className="flex items-center gap-2">
                <Trash2 size={16} />
                <span>Deleted</span>
              </div>
              {deletedCount > 0 && (
                <span className="text-gray-500 text-xs">{deletedCount}</span>
              )}
            </button>
            
            <button 
              className={`w-full flex items-center justify-between py-1 px-3 rounded-md transition-colors ${
                currentFolder === 'spam' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => onFolderChange('spam')}
            >
              <div className="flex items-center gap-2">
                <AlertTriangle size={16} />
                <span>Spam</span>
              </div>
              {spamCount > 0 && (
                <span className="text-gray-500 text-xs">{spamCount}</span>
              )}
            </button>
          </div>
        </div>

        <div className="mt-4">
          <div className="px-3 py-2 text-xs font-semibold text-gray-500">LABELS</div>
          <div className="space-y-1">
            <button className="w-full flex items-center gap-2 py-1 px-3 text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span>Team Events</span>
            </button>
            <button className="w-full flex items-center gap-2 py-1 px-3 text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <span>Work</span>
            </button>
            <button className="w-full flex items-center gap-2 py-1 px-3 text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span>External</span>
            </button>
          </div>
        </div>
      </div>

      <div className="mt-auto p-4 text-xs text-gray-500">
        2014 - 2025 © SmartHR
      </div>
    </div>
  );
};

export default Sidebar;
import React from 'react';
import { Search, Maximize, Grid, Settings, Bell, Mail, MessageSquare } from 'lucide-react';
import Avatar from '../ui/Avatar';
import Badge from '../ui/Badge';
import type { User } from '../../types';

interface HeaderProps {
  user: User;
  unreadEmails: number;
  unreadMessages: number;
  unreadNotifications: number;
}

const Header: React.FC<HeaderProps> = ({
  user,
  unreadEmails,
  unreadMessages,
  unreadNotifications,
}) => {
  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-4">
      <div className="flex items-center gap-4">
        <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        
        <div className="relative">
          <div className="flex items-center border border-gray-300 rounded-md px-3 py-1.5 gap-2 w-64">
            <Search size={18} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search in HRMS"
              className="bg-transparent border-none outline-none text-sm flex-1"
            />
          </div>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-xs text-gray-500">
            <span>CTRL</span>
            <span>+</span>
            <span>/</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
          <Grid size={20} className="text-gray-600" />
        </button>
        
        <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
          <Settings size={20} className="text-gray-600" />
        </button>
        
        <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
          <Maximize size={20} className="text-gray-600" />
        </button>
        
        <div className="border-l border-gray-300 h-6 mx-1"></div>
        
        <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
          <Badge count={unreadNotifications} color="bg-blue-600">
            <Bell size={20} className="text-gray-600" />
          </Badge>
        </button>
        
        <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
          <Badge count={unreadMessages} color="bg-green-600">
            <MessageSquare size={20} className="text-gray-600" />
          </Badge>
        </button>
        
        <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
          <Badge count={unreadEmails} color="bg-red-500">
            <Mail size={20} className="text-gray-600" />
          </Badge>
        </button>
        
        <div className="border-l border-gray-300 h-6 mx-1"></div>
        
        <div className="flex items-center gap-2">
          <Avatar src={user.avatar} alt={user.name} size="sm" />
        </div>
      </div>
    </header>
  );
};

export default Header;
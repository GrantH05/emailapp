import React from 'react';
import { MoreHorizontal, Star, Paperclip } from 'lucide-react';
import type { Email, Label } from '../../types';
import Avatar from '../ui/Avatar';

interface EmailItemProps {
  email: Email;
  labels: Label[];
  isSelected: boolean;
  onClick: () => void;
  onStar: () => void;
}

const EmailItem: React.FC<EmailItemProps> = ({
  email,
  labels,
  isSelected,
  onClick,
  onStar,
}) => {
  const date = new Date(email.date);
  const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  
  // Find labels for this email
  const emailLabels = labels.filter(label => 
    email.labels?.includes(label.id)
  );

  return (
    <div 
      className={`
        border-b last:border-b-0 hover:bg-gray-50 transition-colors cursor-pointer
        ${isSelected ? 'bg-blue-50' : ''}
        ${!email.read ? 'bg-blue-50' : ''}
      `}
      onClick={onClick}
    >
      <div className="flex items-start p-4">
        <div className="mr-3 flex-shrink-0">
          <input
            type="checkbox"
            className="rounded h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
        
        <div className="flex-shrink-0 mr-3 mt-1">
          <button
            className="text-gray-400 hover:text-yellow-400 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              onStar();
            }}
          >
            <Star size={18} fill={email.starred ? 'rgb(250 204 21)' : 'none'} className={email.starred ? 'text-yellow-400' : ''} />
          </button>
        </div>
        
        <div className="mr-3 flex-shrink-0">
          <Avatar src={email.from.avatar} alt={email.from.name} size="sm" />
        </div>
        
        <div className="flex-grow min-w-0">
          <div className="flex items-center mb-1">
            <h3 className={`font-medium text-sm ${!email.read ? 'text-black' : 'text-gray-700'} mr-2`}>
              {email.from.name}
            </h3>
            
            <div className="text-xs text-gray-500 ml-auto flex-shrink-0">
              {formattedTime}
            </div>
          </div>
          
          <div className="flex items-center mb-1">
            <p className={`text-sm truncate ${!email.read ? 'font-medium text-black' : 'text-gray-600 font-normal'}`}>
              {email.subject}
            </p>
          </div>
          
          <div className="flex items-center">
            <p className="text-xs text-gray-500 truncate">
              {email.body.substring(0, 100)}
              {email.body.length > 100 ? '...' : ''}
            </p>
            
            <div className="ml-auto flex gap-1 flex-shrink-0">
              {email.attachments && email.attachments.length > 0 && (
                <span className="text-gray-400">
                  <Paperclip size={14} />
                </span>
              )}
              
              {emailLabels.map(label => (
                <span 
                  key={label.id}
                  className="px-1.5 py-0.5 text-xs rounded-md text-white"
                  style={{ backgroundColor: label.color }}
                >
                  {label.name}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        <button 
          className="ml-2 p-1 rounded-full hover:bg-gray-200 transition-colors"
          onClick={(e) => e.stopPropagation()}
        >
          <MoreHorizontal size={18} className="text-gray-500" />
        </button>
      </div>
    </div>
  );
};

export default EmailItem;
import React from 'react';
import { Download, Reply, Forward, Trash2, Star, ArrowLeft } from 'lucide-react';
import type { Email, Label } from '../../types';
import Avatar from '../ui/Avatar';
import Button from '../ui/Button';

interface EmailDetailProps {
  email: Email;
  labels: Label[];
  onClose: () => void;
  onReply: (email: Email) => void;
  onForward: (email: Email) => void;
  onDelete: (email: Email) => void;
  onStar: () => void;
}

const EmailDetail: React.FC<EmailDetailProps> = ({
  email,
  labels,
  onClose,
  onReply,
  onForward,
  onDelete,
  onStar,
}) => {
  const formattedDate = new Date(email.date).toLocaleString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });

  // Find labels for this email
  const emailLabels = labels.filter(label => 
    email.labels?.includes(label.id)
  );

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
      <div className="p-4 border-b flex items-center">
        <button
          onClick={onClose}
          className="mr-4 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        
        <h2 className="text-xl font-semibold flex-grow truncate">
          {email.subject}
        </h2>
        
        <div className="flex items-center gap-3">
          <button 
            className="text-gray-600 hover:text-gray-900 transition-colors"
            onClick={onStar}
          >
            <Star 
              size={20} 
              fill={email.starred ? 'rgb(250 204 21)' : 'none'} 
              className={email.starred ? 'text-yellow-400' : ''} 
            />
          </button>
          
          <button 
            className="text-gray-600 hover:text-red-600 transition-colors"
            onClick={() => onDelete(email)}
          >
            <Trash2 size={20} />
          </button>
        </div>
      </div>
      
      <div className="p-6 flex-grow overflow-y-auto">
        <div className="flex items-start mb-6">
          <Avatar 
            src={email.from.avatar} 
            alt={email.from.name}
            size="lg"
            className="mr-4"
          />
          
          <div className="flex-grow">
            <div className="flex items-center mb-1">
              <h3 className="font-medium text-lg">{email.from.name}</h3>
              
              <div className="ml-auto text-sm text-gray-500">
                {formattedDate}
              </div>
            </div>
            
            <div className="flex items-center mb-3">
              <p className="text-sm text-gray-600">
                <span className="font-medium">To:</span> {email.to.map(u => u.name).join(', ')}
              </p>
              
              {email.cc && email.cc.length > 0 && (
                <p className="text-sm text-gray-600 ml-4">
                  <span className="font-medium">CC:</span> {email.cc.map(u => u.name).join(', ')}
                </p>
              )}
              
              {email.bcc && email.bcc.length > 0 && (
                <p className="text-sm text-gray-600 ml-4">
                  <span className="font-medium">BCC:</span> {email.bcc.map(u => u.name).join(', ')}
                </p>
              )}
            </div>
            
            {emailLabels.length > 0 && (
              <div className="flex gap-2 mb-4">
                {emailLabels.map(label => (
                  <span 
                    key={label.id}
                    className="px-2 py-1 text-xs rounded-md text-white"
                    style={{ backgroundColor: label.color }}
                  >
                    {label.name}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
        
        <div className="mb-6 text-gray-800 whitespace-pre-line">
          {email.body.split('\n').map((paragraph, i) => (
            <p key={i} className="mb-4">{paragraph}</p>
          ))}
        </div>
        
        {email.attachments && email.attachments.length > 0 && (
          <div className="border rounded-lg overflow-hidden mb-6">
            <div className="px-4 py-3 bg-gray-50 border-b">
              <h4 className="font-medium">Attachments ({email.attachments.length})</h4>
            </div>
            
            <div className="p-4">
              {email.attachments.map((attachment) => (
                <div 
                  key={attachment.id}
                  className="flex items-center p-3 border rounded-md mb-2 last:mb-0"
                >
                  <div className="bg-gray-100 p-2 rounded-md mr-3">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z" stroke="#4B5563" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M14 2V8H20" stroke="#4B5563" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M16 13H8" stroke="#4B5563" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M16 17H8" stroke="#4B5563" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M10 9H9H8" stroke="#4B5563" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  
                  <div className="flex-grow">
                    <p className="font-medium text-sm mb-1">{attachment.name}</p>
                    <p className="text-xs text-gray-500">{formatBytes(attachment.size)}</p>
                  </div>
                  
                  <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <Download size={18} className="text-gray-600" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="flex gap-3">
          <Button 
            variant="primary"
            icon={<Reply size={16} />}
            onClick={() => onReply(email)}
          >
            Reply
          </Button>
          
          <Button
            variant="outline"
            icon={<Forward size={16} />}
            onClick={() => onForward(email)}
          >
            Forward
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmailDetail;
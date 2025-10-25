
import React from 'react';
import { Message, Sender } from '../types';

interface MessageProps {
  message: Message;
}

const UserIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
);

const AiIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
);


const MessageComponent: React.FC<MessageProps> = ({ message }) => {
  const isUser = message.sender === Sender.USER;

  const containerClasses = isUser ? 'flex justify-end' : 'flex justify-start';
  const bubbleClasses = isUser 
    ? 'bg-blue-600 text-white rounded-br-none' 
    : 'bg-slate-700 text-slate-200 rounded-bl-none';
  
  return (
    <div className={`w-full flex items-end gap-2 my-2 ${containerClasses}`}>
        {!isUser && (
            <div className="flex-shrink-0 bg-slate-800 rounded-full p-2">
                <AiIcon />
            </div>
        )}
        <div className={`px-4 py-3 rounded-2xl max-w-lg lg:max-w-2xl animate-fade-in-up ${bubbleClasses}`} style={{ whiteSpace: 'pre-wrap' }}>
            <p>{message.text}</p>
        </div>
        {isUser && (
            <div className="flex-shrink-0 bg-slate-800 rounded-full p-2">
                <UserIcon />
            </div>
        )}
    </div>
  );
};

export default MessageComponent;


import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Chat } from '@google/genai';
import { initializeChat } from '../services/geminiService';
import { Message, Sender } from '../types';
import MessageComponent from './Message';
import MessageInput from './MessageInput';

const ChatWindow: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
      {id: 'initial', text: 'This is an incognito chat session. Your conversation will not be saved. How can I help you?', sender: Sender.AI}
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const chatSession = useRef<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatSession.current = initializeChat();
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = useCallback(async (text: string) => {
    if (!chatSession.current) return;
    setIsLoading(true);

    const userMessage: Message = { id: Date.now().toString(), text, sender: Sender.USER };
    setMessages(prev => [...prev, userMessage]);
    
    const aiMessageId = (Date.now() + 1).toString();
    const aiMessagePlaceholder: Message = { id: aiMessageId, text: '', sender: Sender.AI };
    setMessages(prev => [...prev, aiMessagePlaceholder]);

    try {
      const stream = await chatSession.current.sendMessageStream({ message: text });
      let fullResponse = '';
      for await (const chunk of stream) {
        fullResponse += chunk.text;
        setMessages(prev => prev.map(msg => 
          msg.id === aiMessageId ? { ...msg, text: fullResponse } : msg
        ));
      }
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage: Message = { 
          id: aiMessageId, 
          text: "Sorry, I encountered an error. Please try again.", 
          sender: Sender.AI 
      };
      setMessages(prev => prev.map(msg => msg.id === aiMessageId ? errorMessage : msg));
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="flex flex-col h-full w-full bg-slate-900">
      <div className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="max-w-4xl mx-auto">
            {messages.map((msg) => (
                <MessageComponent key={msg.id} message={msg} />
            ))}
            {isLoading && messages[messages.length-1].sender === Sender.AI && (
               <div className="flex justify-start">
                 <div className="bg-slate-700 px-4 py-3 rounded-2xl rounded-bl-none max-w-lg">
                    <div className="flex items-center space-x-2">
                        <div className="h-2 w-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                        <div className="h-2 w-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                        <div className="h-2 w-2 bg-slate-400 rounded-full animate-bounce"></div>
                    </div>
                </div>
               </div>
            )}
            <div ref={messagesEndRef} />
        </div>
      </div>
      <MessageInput onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  );
};

export default ChatWindow;

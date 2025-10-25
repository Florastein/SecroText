
import React from 'react';
import Header from './components/Header';
import ChatWindow from './components/ChatWindow';
import ScreenshotBlocker from './components/ScreenshotBlocker';

const App: React.FC = () => {
  return (
    <div className="h-screen w-screen flex flex-col font-sans text-slate-200">
      <ScreenshotBlocker>
        <div className="flex flex-col h-full w-full">
            <Header />
            <main className="flex-1 overflow-hidden">
                <ChatWindow />
            </main>
        </div>
      </ScreenshotBlocker>
    </div>
  );
};

export default App;

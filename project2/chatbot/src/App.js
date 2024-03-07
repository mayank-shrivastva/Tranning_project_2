import React, { useState, useRef } from 'react';
import './App.css';
import predefinedResponses from './responses.json';
import gptImgLogo from './assets/chatgptLogo.svg';
import userIcon from './assets/user-icon.png';
import sendBtn from './assets/send.svg';

function App() {
  const [userInput, setUserInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [showChatbot, setShowChatbot] = useState(false); // State to track if chatbot is visible

  const chatEndRef = useRef(null);

  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };

  const sendMessageToDialogflow = () => {
    const { responses } = predefinedResponses;
    const botReply = responses[userInput.toLowerCase()] || "Sorry, I don't understand that.";

    const newChat = [...chatHistory, { user: userInput, bot: botReply }];
    setChatHistory(newChat);
    setUserInput('');

    chatEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const toggleChatbot = () => {
    setShowChatbot(!showChatbot);
  };

  return (
    <div className="App">
      <div className="chatIcon" onClick={toggleChatbot}>
        {showChatbot ? (
          <img src={gptImgLogo} alt="Chat Icon" />
        ) : (
          <img src={gptImgLogo} alt="Chat Icon" />
        )}
      </div>

      {showChatbot && (
        <div className="chatContainer">
          <div className="chatBox">
            {/* Render chat history */}
            {chatHistory.map((chat, index) => (
              <div key={index} className="chat">
                <img src={userIcon} alt="User Icon" />
                <div className="message">
                  <p className="txt">User's message: {chat.user}</p>
                  <p className="txt"><img src={gptImgLogo} alt="Bot Icon" />Bot's response: {chat.bot}</p>
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
          <div className="chatFooter">
            <div className="inp">
              <input
                type="text"
                value={userInput}
                onChange={handleUserInput}
                placeholder='Send message'
              />
              <button className="send" onClick={sendMessageToDialogflow}>
                <img src={sendBtn} alt="Send" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

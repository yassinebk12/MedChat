// Import necessary libraries
import React, { useState, useEffect } from 'react';
import './App.css'; // Import your CSS file

// Chatbot Component
const Chatbot = () => {
  const [messages, setMessages] = useState([]); // To store chat messages
  const [userInput, setUserInput] = useState(''); // To handle user input
  const [history, setHistory] = useState([]); // To store chat history

  // Function to handle sending a message
  const sendMessage = () => {
    if (userInput.trim() === '') return; // Avoid sending empty messages

    const newMessages = [
      ...messages,
      { sender: 'user', text: userInput },
      { sender: 'bot', text: getBotResponse(userInput) },
    ];
    setMessages(newMessages);
    setUserInput('');
    saveToHistory(newMessages);
  };

  // Function to simulate bot response (customize for healthcare specifics)
  const getBotResponse = (input) => {
    if (input.toLowerCase().includes('symptom')) {
      return 'Please describe your symptoms in detail.';
    } else if (input.toLowerCase().includes('appointment')) {
      return 'You can book an appointment by visiting our website or calling our clinic.';
    }
    return 'I am here to help with your healthcare questions. Could you elaborate?';
  };

  // Function to save chat to history
  const saveToHistory = (newMessages) => {
    const updatedHistory = [...history, ...newMessages];
    setHistory(updatedHistory);
    localStorage.setItem('chatHistory', JSON.stringify(updatedHistory));
  };

  // Function to load chat history
  const loadHistory = () => {
    const savedHistory = localStorage.getItem('chatHistory');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  return (
    <div className="chatbot-container">
      <div className="chatbox">
        <div className="messages">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.sender}`}>
              {msg.text}
            </div>
          ))}
        </div>
        <div className="input-container">
          <input
            type="text"
            placeholder="Type your message..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
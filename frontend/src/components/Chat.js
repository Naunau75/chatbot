import React, { useState } from 'react';
import axios from 'axios';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { text: userMessage, isUser: true }]);
    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/chat', {
        message: userMessage
      });

      setMessages(prev => [...prev, { text: response.data.response, isUser: false }]);
    } catch (error) {
      console.error('Error:', error);
    }
    setIsLoading(false);
  };

  return (
    <div className="chat-container" style={styles.container}>
      <div className="messages" style={styles.messages}>
        {messages.map((message, index) => (
          <div
            key={index}
            style={{
              ...styles.message,
              ...(message.isUser ? styles.userMessage : styles.botMessage)
            }}
          >
            {message.text}
          </div>
        ))}
        {isLoading && <div style={styles.loading}>En train de répondre...</div>}
      </div>
      <form onSubmit={sendMessage} style={styles.form}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Écrivez votre message..."
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Envoyer</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
  },
  messages: {
    height: '400px',
    overflowY: 'auto',
    marginBottom: '20px',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  message: {
    margin: '10px 0',
    padding: '10px',
    borderRadius: '5px',
  },
  userMessage: {
    backgroundColor: '#007bff',
    color: 'white',
    marginLeft: '20%',
  },
  botMessage: {
    backgroundColor: '#f1f1f1',
    marginRight: '20%',
  },
  form: {
    display: 'flex',
    gap: '10px',
  },
  input: {
    flex: 1,
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  loading: {
    textAlign: 'center',
    color: '#666',
  },
};

export default Chat; 
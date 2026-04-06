import React, { useState } from 'react';

function App() {
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const sendToKafka = async (e) => {
    e.preventDefault();
    if (!message) return;
    
    setStatus('Sending...');
    try {
      const response = await fetch('/api/messages/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });
      
      if (response.ok) {
        setStatus('Message successfully sent to Kafka!');
        setMessage('');
      } else {
        setStatus('Error sending message. Check console.');
      }
    } catch (error) {
      console.error(error);
      setStatus('Failed to connect to backend.');
    }
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'system-ui, sans-serif', maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
      <h1>Kafka</h1>
      <p>Send a message through Spring Boot into Apache Kafka!</p>

      <form onSubmit={sendToKafka} style={{ marginTop: '20px' }}>
        <input 
          type="text" 
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter a message"
          style={{ padding: '10px', width: '70%', border: '1px solid #ccc', borderRadius: '4px' }}
        />
        <button 
          type="submit"
          style={{ padding: '10px 20px', marginLeft: '10px', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Send
        </button>
      </form>
      
      {status && <p style={{ marginTop: '20px', fontWeight: 'bold' }}>{status}</p>}
    </div>
  );
}

export default App;

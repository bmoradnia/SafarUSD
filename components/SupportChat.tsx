import { useState, useEffect } from 'react';
import styles from './SupportChat.module.css';

export default function SupportChat() {
  const [started, setStarted] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'bot'; text: string }[]>([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (started) {
      timer = setInterval(() => {
        // poll for session close? omitted
      }, 60000);
    }
    return () => clearInterval(timer);
  }, [started]);

  const send = async (msg: string) => {
    const sessionId = localStorage.getItem('sessionId') || crypto.randomUUID();
    localStorage.setItem('sessionId', sessionId);
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId, message: msg, personalityId: 1, department: 'general' })
    });
    const data = await res.json();
    setMessages((m) => [...m, { role: 'bot', text: data.reply }]);
    if (data.sessionClosed) {
      setStarted(false);
    }
  };

  if (!started) {
    return <button onClick={() => { setStarted(true); setMessages([{ role: 'bot', text: 'در خدمتتون هستم' }]); }}>شروع</button>;
  }

  return (
    <div className={styles.chatBox}>
      <div className={styles.messages}>
        {messages.map((m, i) => (
          <div key={i} className={m.role === 'user' ? styles.user : styles.bot}>{m.text}</div>
        ))}
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setMessages((m) => [...m, { role: 'user', text: input }]);
          send(input);
          setInput('');
        }}
      >
        <input value={input} onChange={(e) => setInput(e.target.value)} />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

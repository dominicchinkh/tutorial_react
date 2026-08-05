import { SubmitEvent, useState } from 'react';

export default function FeedbackForm() {
  const [text, setText] = useState('');
  const [status, setStatus] = useState('typing');

  /*
   *  ❌ This leaves the door open for “impossible” states. For example, if you forget
   *      to call setIsSent and setIsSending together, you may end up in a situation 
   *      where both isSending and isSent are true at the same time. It is better to 
   *      replace them with one status state variable that may take one of three valid
   *      states: 'typing' (initial), 'sending', and 'sent'
   *
   *    const [isSending, setIsSending] = useState(false);
   *    const [isSent, setIsSent] = useState(false);
   */ 

  async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    await sendMessage(text);
    setStatus('sent');
  }

  const isSending = status === 'sending';
  const isSent = status === 'sent';

  if (isSent) {
    return <h1>Thanks for feedback!</h1>
  }

  return (
    <form onSubmit={handleSubmit}>
      <p>How was your stay at The Prancing Pony?</p>
      <textarea
        disabled={isSending}
        value={text}
        onChange={e => setText(e.target.value)}
      />

      <br />

      <button
        disabled={isSending}
        type="submit"
      >
        Send
      </button>

      {isSending && <p>Sending...</p>}

    </form>
  );
}

// Pretend to send a message.
function sendMessage(text: string) {
  return new Promise(resolve => {
    console.log(text);
    setTimeout(resolve, 2000);
  });
}

import { useState } from 'react';

export interface Contact {
  name: string;
  email: string;
}

interface ContactProps
{
  contact: Contact
}

function Chat({ contact }: ContactProps) {
  const [text, setText] = useState('');

  return (
    <section className="chat">
      <textarea
        value={text}
        placeholder={'Chat to ' + contact.name}
        onChange={e => setText(e.target.value)}
      />
      <br />
      <button>Send to {contact.email}</button>
    </section>
  );
}

interface ContactListProps
{
  contacts: Contact[],
  onSelect: (contact: Contact) => void
}

function ContactList({
  contacts,
  onSelect
}: ContactListProps) {
  return (
    <section className="contact-list">
      <ul>
        {contacts.map(contact =>
          <li key={contact.email}>
            <button onClick={() => {
              onSelect(contact);
            }}>
              {contact.name}
            </button>
          </li>
        )}
      </ul>
    </section>
  );
}

export default function Messenger() {
  const [to, setTo] = useState(contacts[0]);

  return (
    <div>
      <ContactList
        contacts={contacts}
        onSelect={contact => setTo(contact)}
      />

      {/* 
        By passing it a different key, like `<Chat key={email} />`, we force a component 
        to reset its state. This tells React that if the recipient is different, it should
        be considered a different Chat component that needs to be re-created from scratch
        with the new data
      */}
      <Chat key={to.email} contact={to} />
    </div>
  )
}

const contacts = [
  { name: 'Taylor', email: 'taylor@mail.com' },
  { name: 'Alice', email: 'alice@mail.com' },
  { name: 'Bob', email: 'bob@mail.com' }
];
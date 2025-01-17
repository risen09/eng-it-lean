'use client';

import React from 'react';
import { useChat } from 'ai/react';
import { getConfigValue } from '@brojs/cli';

export default function Page() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: `${getConfigValue("eng-it-lean.api")}/gigachat/chat`,
  });

  return (
    <>
      {messages.map(message => (
        <div key={message.id}>
          {message.role === 'user' ? 'User: ' : 'GigaChat: '}
          {message.content}
        </div>
      ))}

      <form onSubmit={handleSubmit}>
        <input name="prompt" value={input} onChange={handleInputChange} />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
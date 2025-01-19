'use client';

import React from 'react';
import { useChat } from 'ai/react';
import { getConfigValue } from '@brojs/cli';

export default function Page() {
  const { messages, input, handleInputChange, handleSubmit, error, reload } = useChat({
    api: `${getConfigValue("eng-it-lean.api")}/gigachat/chat`,
    onFinish(message, { usage, finishReason }) {
      console.log('Finished streaming message:', message);
      console.log('Token usage:', usage);
      console.log('Finish reason:', finishReason);
    },
    onError: error => {
      console.error('An error occurred:', error);
    },
    onResponse: response => {
      console.log('Received HTTP response from server:', response);
    },
  });

  return (
    <>
      {messages.map(message => (
        <div key={message.id}>
          {message.role === 'user' ? 'User: ' : 'GigaChat: '}
          {message.content}
        </div>
      ))}

      {error && (
        <>
          <div>{error.message}</div>
          <button type='button' onClick={() => reload()}>
            Reload
          </button>
        </>
      )}

      <form onSubmit={handleSubmit}>
        <input name="prompt" value={input} onChange={handleInputChange} />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
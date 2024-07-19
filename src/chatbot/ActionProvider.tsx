// ActionProvider starter code
import React from 'react';

function ActionProvider(props: { createChatBotMessage: any, setState: any, children: any }) {
  const handleHello = () => {
    const botMessage = props.createChatBotMessage('Hello. Nice to meet you.');

    props.setState((prev: any) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  // Put the handleHello function in the actions object to pass to the MessageParser
  return (
    <div>
      {React.Children.map(props.children, (child) => {
        return React.cloneElement(child, {
          actions: {
            handleHello,
          },
        });
      })}
    </div>
  );
};

export default ActionProvider;
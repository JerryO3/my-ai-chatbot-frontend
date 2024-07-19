// ActionProvider starter code
import React from 'react';

function ActionProvider(props: { createChatBotMessage: any, setState: any, children: any }) {
  const respond = (response: string) => {
    const botMessage = props.createChatBotMessage(response);

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
            respond,
          },
        });
      })}
    </div>
  );
};

export default ActionProvider;
// MessageParser starter code
import React from 'react';

function MessageParser(props: { children: any, actions: any }) {
  document.getElementsByClassName("react-chatbot-kit-chat-input").item(0)?.addEventListener("onkeydown", (e) => {/* call send function */});
  document.getElementsByClassName("react-chatbot-kit-chat-input").item(0)?.addEventListener("onkeydown", (e) => {/* clear chat history function */});
  const parse = (message: string) => {
    // TODO: add request to proxy server
    props.actions.respond(message)
  };

  return (
    <div>
      {React.Children.map(props.children, (child) => {
        return React.cloneElement(child, {
          parse: parse,
          actions: {},
        });
      })}
    </div>
  );
};

export default MessageParser;
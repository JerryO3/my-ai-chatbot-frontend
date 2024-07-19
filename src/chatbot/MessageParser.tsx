// MessageParser starter code
import React from 'react';

function MessageParser(props: { children: any, actions: any }) {
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
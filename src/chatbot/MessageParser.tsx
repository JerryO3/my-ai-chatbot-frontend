import React from 'react'

/**
 * Use this component to configure the ruleset of the parse method.
 * It takes in the user message and can be configured to take different
 * actions as defined in ActionProvider.
 */
function MessageParser(props: { children: any, actions: any }) {

  const parse = (message: string) => {
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

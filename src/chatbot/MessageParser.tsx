// MessageParser starter code
import React from 'react'

function MessageParser(props: { children: any, actions: any }) {

  // document.getElementsByClassName("react-chatbot-kit-chat-input").item(0)?.addEventListener("keydown", (e) => { 
  //   let input = document.getElementsByClassName("react-chatbot-kit-chat-input").item(0)?.textContent
  //   if ((e as KeyboardEvent).key === "Enter" && typeof input === "string") {
  //     parse(input);
  //     (document.getElementsByClassName("react-chatbot-kit-chat-input").item(0) as HTMLTextAreaElement).value = ""
  //   }
  // });
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

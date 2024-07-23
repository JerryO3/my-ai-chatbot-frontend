// ActionProvider starter code
import React from 'react';
import { server } from '../App';

function ActionProvider(props: { createChatBotMessage: any, setState: any, children: any }) {
  const respond = (response: string) => {
    const getBotMessage = (response: string) => props.createChatBotMessage(response);

    const addToHistory = (botMessage: any) => props.setState((prev: any) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));

    sendQuery(response, getBotMessage, addToHistory)

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


export function sendQuery(query: string, getBotMessage: (arg: string) => any, addToHistory: (arg: any) => any) {
  if (query.trim() !== "") {
    const obj = {"prompt": query,
        "stream": false,
        "use_context": true,
        "include_sources": true}

    fetch(server + "/submit-query",
        {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(obj)
        }
    )
    .then(response => {console.log(1); return response.json()})
    .then(json => parseResponse(json))
    .then(response => getBotMessage(response))
    .then(msg => addToHistory(msg))
    .catch(error => console.error(error));
  }
}

export function parseResponse(json: Object) {
  return json.toString()
}
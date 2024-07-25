import React from 'react';
import { server } from '../App';

/**
 * Use this component to add bot response actions to the initial message as
 * parsed by MessageParser.
 */
function ActionProvider(props: { createChatBotMessage: any, setState: any, children: any }) {
  const respond = (response: string) => {
    const getBotMessage = (response: string) => props.createChatBotMessage(response);

    const addToHistory = (botMessage: any) => props.setState((prev: any) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));

    sendQuery(response, getBotMessage, addToHistory)

  };

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

/**
 * Sends the query with the configurations set in the obj variable. 
 * The obj variable ensures that uploaded documents are referenced,
 * sources are included and the response is returned as a single message.
 * @param query is a string representing the query sent to bot.
 * @param getBotMessage is a function that creates a message on the UI 
 * that is called once the response from server is received.
 * @param addToHistory is a function that adds the message to message 
 * history once the response from server is received.
 */
export function sendQuery(query: string, getBotMessage: (arg: string) => any, addToHistory: (arg: any) => any) {
  if (query.trim() !== "") {
    const obj = {"prompt": query,
        "stream": false,
        "use_context": true,
        "include_sources": true}

    fetch(server + "/submit-query/",
        {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(obj)
        }
    )
    .then(response => {let obj = response.json(); console.log(obj); return obj})
    .then(json => json.toString())
    .then(response => getBotMessage(response))
    .then(msg => addToHistory(msg))
    .catch(error => console.error(error));
  }
}
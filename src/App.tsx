import './App.css';
import Chatbot from "react-chatbot-kit";

import config from "./configs/chatbotConfig";
import MessageParser from "./chatbot/MessageParser";
import ActionProvider from "./chatbot/ActionProvider";
import { FileContainer } from './FileContainer';

function App() {
  // console.log(document.getElementsByClassName("react-chatbot-kit-chat-input").item(0)?.addEventListener())

  // document.getElementsByClassName("react-chatbot-kit-chat-input").item(0).on

  return (
    <div className="App">
      <div id='filePane'>
        <FileContainer></FileContainer>
      </div>
      <div id='chatPane'>
        <Chatbot
            config={config}
            messageParser={MessageParser}
            actionProvider={ActionProvider}
          />
      </div>
    </div>
  );
}

export default App;
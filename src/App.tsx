import './App.css';
import Chatbot from "react-chatbot-kit";

import config from "./configs/chatbotConfig";
import MessageParser from "./chatbot/MessageParser";
import ActionProvider from "./chatbot/ActionProvider";
import { FileContainer } from './filepanel/FileContainer';

export const server = 'http://localhost:8000'

function App() {

  const validator = (input: string) => {
    return input !== ""
  }

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
            validator={validator}
          />
      </div>
    </div>
  );
}

export default App;
import './App.css';
import Chatbot from "react-chatbot-kit";

import config from "./configs/chatbotConfig";
import MessageParser from "./chatbot/MessageParser";
import ActionProvider from "./chatbot/ActionProvider";
import { FileContainer } from './filepanel/FileContainer';

export const server = 'http://localhost:8000'
/**
 * The base component of the webapp. Its 2 direct child components 
 * are the FileContainer and Chatbot. Configure the validator to 
 * prevent accidental input. The CSS styling of all components can be 
 * found in App.css.
 * @returns HTML render of the app.
 */
function App() {

  /**
   * Takes in an input and returns a boolean value representing
   * if the use message is valid. Use this to guard against accidental
   * or adversarial input.
   * @param input string representing user message
   * @returns boolean representing if the message is valid.
   */
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